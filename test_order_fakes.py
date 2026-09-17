import unittest
from order_service import (
    Order,
    InventoryService,
    PaymentGateway,
    InventoryShortageError,
    PaymentFailedError,
    InvalidOrderError
)

# --- Concrete In-Memory Mock Implementations ---

class InMemoryInventoryService(InventoryService):
    def __init__(self, initial_stock=None):
        self.stock = initial_stock or {}
        self.decrement_calls = []

    def get_stock(self, product_id: str) -> int:
        return self.stock.get(product_id, 0)

    def decrement_stock(self, product_id: str, quantity: int):
        if self.stock.get(product_id, 0) < quantity:
            raise ValueError('Insufficient stock to decrement')
        self.stock[product_id] -= quantity
        self.decrement_calls.append((product_id, quantity))


class MockPaymentGateway(PaymentGateway):
    def __init__(self, should_succeed=True, exception_to_raise=None):
        self.should_succeed = should_succeed
        self.exception_to_raise = exception_to_raise
        self.charges = []

    def charge(self, amount: float, currency: str) -> bool:
        if self.exception_to_raise:
            raise self.exception_to_raise
        self.charges.append({'amount': amount, 'currency': currency})
        return self.should_succeed


# --- Unit Tests Using Concrete Mock Classes ---

class TestOrderWithFakeImplementations(unittest.TestCase):
    def setUp(self):
        self.inventory = InMemoryInventoryService(initial_stock={
            'laptop': 5,
            'mouse': 10,
            'keyboard': 2
        })
        self.payment = MockPaymentGateway(should_succeed=True)
        self.order = Order(
            inventory_service=self.inventory,
            payment_gateway=self.payment,
            customer_email='buyer@domain.com',
            is_vip=False
        )

    def test_successful_checkout_updates_inventory_and_charges_gateway(self):
        self.order.add_item('laptop', price=500.0, quantity=1)
        self.order.add_item('mouse', price=25.0, quantity=2) # total = 550.0 -> 10% off -> 495.0

        result = self.order.checkout()

        self.assertEqual(result, {'status': 'success', 'charged_amount': 495.0})
        self.assertTrue(self.order.is_paid)
        self.assertEqual(self.order.status, 'COMPLETED')
        
        # Verify in-memory inventory was decremented
        self.assertEqual(self.inventory.get_stock('laptop'), 4)
        self.assertEqual(self.inventory.get_stock('mouse'), 8)
        self.assertEqual(len(self.payment.charges), 1)
        self.assertEqual(self.payment.charges[0], {'amount': 495.0, 'currency': 'USD'})

    def test_checkout_fails_when_inventory_insufficient(self):
        self.order.add_item('keyboard', price=50.0, quantity=5) # only 2 in stock

        with self.assertRaises(InventoryShortageError) as ctx:
            self.order.checkout()

        self.assertIn('Not enough stock for keyboard', str(ctx.exception))
        # Verify no charges were made and stock was NOT modified
        self.assertEqual(len(self.payment.charges), 0)
        self.assertEqual(self.inventory.get_stock('keyboard'), 2)
        self.assertFalse(self.order.is_paid)

    def test_checkout_fails_when_payment_declined(self):
        self.payment.should_succeed = False
        self.order.add_item('laptop', price=500.0, quantity=1)

        with self.assertRaises(PaymentFailedError) as ctx:
            self.order.checkout()

        self.assertEqual(str(ctx.exception), 'Transaction declined by gateway')
        # Verify inventory stock was NOT decremented
        self.assertEqual(self.inventory.get_stock('laptop'), 5)
        self.assertFalse(self.order.is_paid)

    def test_checkout_fails_when_payment_gateway_throws_network_error(self):
        self.payment.exception_to_raise = TimeoutError('Connection to payment server timed out')
        self.order.add_item('mouse', price=25.0, quantity=1)

        with self.assertRaises(PaymentFailedError) as ctx:
            self.order.checkout()

        self.assertIn('Payment gateway error: Connection to payment server timed out', str(ctx.exception))
        # Verify inventory stock was NOT decremented
        self.assertEqual(self.inventory.get_stock('mouse'), 10)
        self.assertFalse(self.order.is_paid)

    def test_empty_cart_checkout_raises_error(self):
        with self.assertRaises(InvalidOrderError):
            self.order.checkout()
        self.assertEqual(len(self.payment.charges), 0)

if __name__ == '__main__':
    unittest.main()
