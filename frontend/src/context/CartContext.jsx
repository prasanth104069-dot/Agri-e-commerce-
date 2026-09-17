import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('agrimart_cart');
      return saved ? JSON.parse(saved) : [
        // Seed initial demo cart item for instant UX showcase
        {
          id: "fert-01",
          name: "100% Organic Earthworm Vermicompost (Nutrient Dense)",
          hindiName: "100% जैविक केंचुआ खाद (वर्मीकम्पोस्ट)",
          price: 399,
          originalPrice: 599,
          unit: "25 kg Bag",
          image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
          quantity: 2,
          stock: 500,
          category: "fertilizers"
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('agrimart_wishlist');
      return saved ? JSON.parse(saved) : ["seed-01", "tool-01"];
    } catch {
      return [];
    }
  });

  // Active UI Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCropDoctorOpen, setIsCropDoctorOpen] = useState(false);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Pincode validation state
  const [userPincode, setUserPincode] = useState(() => localStorage.getItem('agrimart_pincode') || '452001');
  const [pincodeInfo, setPincodeInfo] = useState({
    pincode: '452001',
    hub: 'Indore Agro Delivery Center',
    estimatedDays: '2 - 3 Business Days',
    codAvailable: true
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('agrimart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('agrimart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add to cart
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            hindiName: product.hindiName,
            price: product.price,
            originalPrice: product.originalPrice,
            unit: product.unit,
            image: product.image,
            quantity: qty,
            stock: product.stock,
            category: product.category
          }
        ];
      }
    });

    showToast(`🌾 Added ${qty}x "${product.name.slice(0, 30)}..." to your Agri Cart!`);
  };

  // Add bulk bundle (e.g. from calculator)
  const addBundleToCart = (bundleItems) => {
    setCart(prev => {
      let updated = [...prev];
      bundleItems.forEach(item => {
        const existing = updated.find(p => p.id === item.productId || p.id === item.id);
        const qtyToAdd = item.recommendedQuantity || item.quantity || 1;
        if (existing) {
          updated = updated.map(p =>
            p.id === existing.id
              ? { ...p, quantity: p.quantity + qtyToAdd }
              : p
          );
        } else {
          updated.push({
            id: item.productId || item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice || Math.round(item.price * 1.25),
            unit: item.unit,
            image: item.image,
            quantity: qtyToAdd,
            stock: 100,
            category: 'bundle'
          });
        }
      });
      return updated;
    });

    showToast(`🎉 Complete Agri Fertilizer & Seed Bundle (${bundleItems.length} items) added to cart!`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from cart", "info");
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist", "info");
        return prev.filter(id => id !== productId);
      } else {
        showToast("❤️ Saved to your Wishlist!");
        return [...prev, productId];
      }
    });
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Bulk Farmer Discounts: 5% off if >= 4 items, 10% off if >= 8 items
  let bulkDiscountRate = 0;
  if (cartCount >= 8) {
    bulkDiscountRate = 0.10;
  } else if (cartCount >= 4) {
    bulkDiscountRate = 0.05;
  }

  const bulkDiscount = Math.round(subtotal * bulkDiscountRate);
  const shippingFee = subtotal > 999 || cart.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - bulkDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        bulkDiscountRate,
        bulkDiscount,
        shippingFee,
        grandTotal,
        wishlist,
        addToCart,
        addBundleToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCalculatorOpen,
        setIsCalculatorOpen,
        isCropDoctorOpen,
        setIsCropDoctorOpen,
        isFarmerModalOpen,
        setIsFarmerModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingOrderId,
        setTrackingOrderId,
        toasts,
        showToast,
        removeToast,
        userPincode,
        setUserPincode,
        pincodeInfo,
        setPincodeInfo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
