import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Award,
  HelpCircle,
  MapPin
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { lang, t } = useLanguage();
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen,
    setIsCartOpen,
    userPincode,
    setUserPincode,
    pincodeInfo,
    setPincodeInfo
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState(userPincode || '452001');
  const [pincodeMessage, setPincodeMessage] = useState(null);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setUserPincode(pincodeInput);
      setPincodeInfo({
        pincode: pincodeInput,
        hub: pincodeInput.startsWith('45') ? 'Indore Agro Terminal' : 'Central Kisan Logistics Center',
        estimatedDays: '2 - 3 Business Days',
        codAvailable: true
      });
      setPincodeMessage(`✅ Delivery available to ${pincodeInput} in 2-3 Days. Cash on Delivery is supported!`);
    } else {
      setPincodeMessage(`❌ Please enter a valid 6-digit Pincode.`);
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 flex flex-col gap-4">
            
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />
              
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-700 text-white shadow-md">
                  {selectedProduct.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  isWishlisted ? 'bg-rose-50 text-rose-600 shadow-md' : 'bg-white/80 text-stone-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Manufacturer & Govt License Details */}
            {selectedProduct.manufacturerInfo && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('manufacturer')} & Certifications</span>
                </div>
                <div className="text-stone-700 font-medium">{selectedProduct.manufacturerInfo.name}</div>
                <div className="text-stone-500 text-[11px] mt-0.5">License: {selectedProduct.manufacturerInfo.license}</div>
                <div className="text-stone-500 text-[11px]">Origin: {selectedProduct.manufacturerInfo.origin}</div>
              </div>
            )}

          </div>

          {/* Right Column: Title, Specs, Dosage, Pincode & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-xs font-semibold">
                  {selectedProduct.brand}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs font-medium text-emerald-700 uppercase">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
                {lang === 'hi' && selectedProduct.hindiName ? selectedProduct.hindiName : selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="text-xs font-bold text-amber-900">{selectedProduct.rating}</span>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  ({selectedProduct.reviewsCount} verified farmer reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-stone-900">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-xs text-stone-500 font-medium">
                  / {selectedProduct.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Agricultural Dosage & Application Guide */}
              {selectedProduct.dosageGuide && (
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{t('dosage')} (अनुशंसित मात्रा)</span>
                  </h4>
                  <p className="text-xs text-amber-900 font-medium">
                    {selectedProduct.dosageGuide}
                  </p>
                </div>
              )}

              {/* Key Features Bullet List */}
              {selectedProduct.features && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-stone-900 mb-2">Key Crop Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable Crops Tags */}
              {selectedProduct.suitableCrops && (
                <div className="mt-4">
                  <span className="text-xs font-bold text-stone-700">{t('suitableFor')}: </span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1 ml-1">
                    {selectedProduct.suitableCrops.map((c, i) => (
                      <span key={i} className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-lg border border-stone-200 font-medium">
                        🌾 {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Estimator */}
              <div className="mt-5 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder={t('enterPincode')}
                    className="w-36 bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    {t('check')}
                  </button>
                </form>
                {pincodeMessage && (
                  <div className="mt-2 text-xs font-semibold text-emerald-800">
                    {pincodeMessage}
                  </div>
                )}
              </div>

            </div>

            {/* Actions: Quantity + Add to Cart + Buy Now */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-stone-100 border border-stone-300 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-stone-700 hover:bg-stone-200 flex items-center justify-center font-bold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-extrabold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white text-stone-700 hover:bg-stone-200 flex items-center justify-center font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToCart')} (₹{(selectedProduct.price * quantity).toLocaleString('en-IN')})</span>
              </button>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 transition-all transform active:scale-95"
              >
                <span>{t('buyNow')}</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
