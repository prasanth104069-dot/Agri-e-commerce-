import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag
} from 'lucide-react';

export const CartDrawer = () => {
  const { lang, t } = useLanguage();
  const {
    cart,
    cartCount,
    subtotal,
    bulkDiscountRate,
    bulkDiscount,
    shippingFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-stone-900">
                {t('cart')} ({cartCount} {t('items')})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bulk Discount Indicator Progress Bar */}
          <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100">
            {cartCount < 4 ? (
              <div className="text-xs text-emerald-900">
                <span className="font-bold">🌱 Farmer Bulk Offer: </span>
                Add <span className="font-extrabold text-emerald-700">{4 - cartCount} more item(s)</span> to unlock an extra <span className="font-bold text-amber-700">5% Wholesale Discount</span>!
              </div>
            ) : cartCount < 8 ? (
              <div className="text-xs text-emerald-900">
                <span className="font-bold">✨ 5% Bulk Discount Active! </span>
                Add <span className="font-extrabold text-emerald-700">{8 - cartCount} more item(s)</span> to unlock max <span className="font-bold text-emerald-800">10% Discount</span>!
              </div>
            ) : (
              <div className="text-xs text-emerald-900 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>🎉 Maximum 10% Farmer Bulk Discount Applied!</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-stone-800 text-base mb-1">
                  {t('emptyCartTitle')}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  {t('emptyCartSubtitle')}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 items-start">
                  
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 bg-stone-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight">
                      {lang === 'hi' && item.hindiName ? item.hindiName : item.name}
                    </h4>
                    
                    {item.unit && (
                      <span className="text-[11px] text-stone-500 font-medium block mt-0.5">
                        {item.unit}
                      </span>
                    )}

                    <div className="flex items-center justify-between gap-2 mt-2">
                      <div className="text-xs font-extrabold text-stone-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        <span className="text-[10px] font-normal text-stone-400 ml-1">
                          (₹{item.price} ea)
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-stone-100 border border-stone-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white text-stone-700 hover:bg-stone-200 flex items-center justify-center font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{t('discount')} ({bulkDiscountRate * 100}%)</span>
                    </span>
                    <span>-₹{bulkDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">{t('free')}</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-extrabold text-stone-900">
                  <span>{t('grandTotal')}</span>
                  <span className="text-base text-emerald-800 font-black">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 transition-all transform active:scale-98"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure Farm Checkout</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Village Delivery Available</span>
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
