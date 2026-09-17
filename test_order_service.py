import unittest
from unittest.mock import Mock, call
from order_service import (
    Order,
    InventoryService,
    PaymentGateway,
    InventoryShortageError,
    PaymentFailedError,
    InvalidOrderError
)

class TestOrder(unittest.TestCase):
    def setUp(self):
        self.mock_inventory = Mock(spec=InventoryService)
        self.mock_payment = Mock(spec=PaymentGateway)
        self.order = Order(
            inventory_service=self.mock_inventory,
            payment_gateway=self.mock_payment,
            customer_email='customer@example.com',
            is_vip=False
        )

    # --- Item Management Tests ---
    def test_add_single_item(self):
        self.order.add_item('prod_1', price=25.0, quantity=2)
        self.assertIn('prod_1', self.order.items)
        self.assertEqual(self.order.items['prod_1'], {'price': 25.0, 'qty': 2})

    def test_add_existing_item_accumulates_quantity(self):
        self.order.add_item('prod_1', price=25.0, quantity=2)
        self.order.add_item('prod_1', price=25.0, quantity=3)
        self.assertEqual(self.order.items['prod_1']['qty'], 5)

    def test_add_item_negative_price_raises_value_error(self):
        with self.assertRaises(ValueError) as ctx:
            self.order.add_item('prod_1', price=-10.0, quantity=1)
        self.assertEqual(str(ctx.exception), 'Price cannot be negative')

    def test_add_item_zero_quantity_raises_value_error(self):
        with self.assertRaises(ValueError) as ctx:
            self.order.add_item('prod_1', price=10.0, quantity=0)
        self.assertEqual(str(ctx.exception), 'Quantity must be greater than zero')

    def test_add_item_negative_quantity_raises_value_error(self):
        with self.assertRaises(ValueError) as ctx:
            self.order.add_item('prod_1', price=10.0, quantity=-2)
        self.assertEqual(str(ctx.exception), 'Quantity must be greater than zero')

    def test_remove_existing_item(self):
        self.order.add_item('prod_1', price=10.0, quantity=1)
        self.order.remove_item('prod_1')
        self.assertNotIn('prod_1', self.order.items)

    def test_remove_nonexistent_item_does_not_raise_error(self):
        self.order.remove_item('prod_unknown')
        self.assertEqual(len(self.order.items), 0)

    # --- Price and Discount Tests ---
    def test_total_price_empty_cart(self):
        self.assertEqual(self.order.total_price, 0.0)

    def test_total_price_multiple_items(self):
        self.order.add_item('prod_1', price=10.0, quantity=2) # 20.0
        self.order.add_item('prod_2', price=15.5, quantity=2) # 31.0
        self.assertEqual(self.order.total_price, 51.0)

    def test_apply_discount_regular_customer_under_or_equal_100(self):
        self.order.add_item('prod_1', price=50.0, quantity=2) # 100.0 total
        self.assertEqual(self.order.apply_discount(), 100.0)

    def test_apply_discount_regular_customer_over_100(self):
        self.order.add_item('prod_1', price=60.0, quantity=2) # 120.0 total
        # 10% off of 120 = 108.0
        self.assertEqual(self.order.apply_discount(), 108.0)

    def test_apply_discount_vip_customer_flat_20_percent(self):
        vip_order = Order(
            inventory_service=self.mock_inventory,
            payment_gateway=self.mock_payment,
            customer_email='vip@example.com',
            is_vip=True
        )
        vip_order.add_item('prod_1', price=50.0, quantity=1) # 50.0 total
        # 20% off of 50 = 40.0
        self.assertEqual(vip_order.apply_discount(), 40.0)

    def test_apply_discount_vip_customer_over_100(self):
        vip_order = Order(
            inventory_service=self.mock_inventory,
            payment_gateway=self.mock_payment,
            customer_email='vip@example.com',
            is_vip=True
        )
        vip_order.add_item('prod_1', price=100.0, quantity=2) # 200.0 total
        # 20% off of 200 = 160.0 (VIP takes precedence over regular >100 rule)
        self.assertEqual(vip_order.apply_discount(), 160.0)

    # --- Checkout Logic Tests ---
    def test_checkout_empty_cart_raises_invalid_order_error(self):
        with self.assertRaises(InvalidOrderError) as ctx:
            self.order.checkout()
        self.assertEqual(str(ctx.exception), 'Cannot checkout an empty cart')
        self.mock_inventory.get_stock.assert_not_called()
        self.mock_payment.charge.assert_not_called()
        self.mock_inventory.decrement_stock.assert_not_called()

    def test_checkout_insufficient_stock_raises_inventory_shortage_error(self):
        self.order.add_item('prod_1', price=20.0, quantity=5)
        self.mock_inventory.get_stock.return_value = 3 # Only 3 available

        with self.assertRaises(InventoryShortageError) as ctx:
            self.order.checkout()

        self.assertIn('Not enough stock for prod_1', str(ctx.exception))
        self.mock_inventory.get_stock.assert_called_once_with('prod_1')
        self.mock_payment.charge.assert_not_called()
        self.mock_inventory.decrement_stock.assert_not_called()
        self.assertFalse(self.order.is_paid)
        self.assertEqual(self.order.status, 'DRAFT')

    def test_checkout_payment_declined_raises_payment_failed_error(self):
        self.order.add_item('prod_1', price=50.0, quantity=1)
        self.mock_inventory.get_stock.return_value = 10
        self.mock_payment.charge.return_value = False # Payment declined

        with self.assertRaises(PaymentFailedError) as ctx:
            self.order.checkout()

        self.assertEqual(str(ctx.exception), 'Transaction declined by gateway')
        self.mock_inventory.get_stock.assert_called_once_with('prod_1')
        self.mock_payment.charge.assert_called_once_with(50.0, 'USD')
        self.mock_inventory.decrement_stock.assert_not_called()
        self.assertFalse(self.order.is_paid)
        self.assertEqual(self.order.status, 'DRAFT')

    def test_checkout_payment_exception_raises_payment_failed_error(self):
        self.order.add_item('prod_1', price=50.0, quantity=1)
        self.mock_inventory.get_stock.return_value = 10
        self.mock_payment.charge.side_effect = ConnectionError('Gateway timeout')

        with self.assertRaises(PaymentFailedError) as ctx:
            self.order.checkout()

        self.assertIn('Payment gateway error: Gateway timeout', str(ctx.exception))
        self.mock_inventory.decrement_stock.assert_not_called()
        self.assertFalse(self.order.is_paid)
        self.assertEqual(self.order.status, 'DRAFT')

    def test_checkout_success_regular_customer(self):
        self.order.add_item('prod_1', price=60.0, quantity=2) # 120 total
        self.order.add_item('prod_2', price=10.0, quantity=1) # 130 total -> 117 after 10% discount
        
        self.mock_inventory.get_stock.side_effect = lambda pid: 10
        self.mock_payment.charge.return_value = True

        result = self.order.checkout()

        # Check stock validations
        self.assertEqual(self.mock_inventory.get_stock.call_count, 2)
        self.mock_inventory.get_stock.assert_has_calls([call('prod_1'), call('prod_2')], any_order=True)

        # Check payment charge (130 * 0.9 = 117.0)
        self.mock_payment.charge.assert_called_once_with(117.0, 'USD')

        # Check decrement stock
        self.assertEqual(self.mock_inventory.decrement_stock.call_count, 2)
        self.mock_inventory.decrement_stock.assert_has_calls([
            call('prod_1', 2),
            call('prod_2', 1)
        ], any_order=True)

        # Check order state
        self.assertTrue(self.order.is_paid)
        self.assertEqual(self.order.status, 'COMPLETED')
        self.assertEqual(result, {'status': 'success', 'charged_amount': 117.0})

    def test_checkout_success_vip_customer(self):
        vip_order = Order(
            inventory_service=self.mock_inventory,
            payment_gateway=self.mock_payment,
            customer_email='vip@example.com',
            is_vip=True
        )
        vip_order.add_item('prod_1', price=100.0, quantity=1)
        self.mock_inventory.get_stock.return_value = 5
        self.mock_payment.charge.return_value = True

        result = vip_order.checkout()

        # 100 * 0.8 = 80.0
        self.mock_payment.charge.assert_called_once_with(80.0, 'USD')
        self.mock_inventory.decrement_stock.assert_called_once_with('prod_1', 1)
        self.assertTrue(vip_order.is_paid)
        self.assertEqual(vip_order.status, 'COMPLETED')
        self.assertEqual(result, {'status': 'success', 'charged_amount': 80.0})

if __name__ == '__main__':
    unittest.main()
