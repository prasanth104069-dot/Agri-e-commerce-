import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  Star,
  Plus,
  Minus,
  Eye,
  Heart,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { lang, t } = useLanguage();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct
  } = useCart();

  const cartItem = cart.find(item => item.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
        
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${
              product.badge === 'Best Seller'
                ? 'bg-amber-400 text-amber-950'
                : product.badge === 'Govt Certified'
                ? 'bg-blue-600 text-white'
                : product.badge === 'Organic Certified' || product.isOrganic
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}>
              {product.badge}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          type="button"
          onClick={() => setSelectedProduct(product)}
          className="absolute inset-x-4 bottom-3 py-2 px-3 rounded-xl bg-stone-900/85 hover:bg-emerald-800 text-white text-xs font-bold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t('quickView')}</span>
        </button>

      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Unit Category */}
          <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            <span className="font-medium text-stone-500">
              {product.unit}
            </span>
          </div>

          {/* Product Name (Clickable to view detail) */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors"
          >
            {lang === 'hi' && product.hindiName ? product.hindiName : product.name}
          </h3>

          {/* Suitable crops preview */}
          {product.suitableCrops && product.suitableCrops.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.suitableCrops.slice(0, 3).map((crop, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200"
                >
                  🌾 {crop}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span className="text-xs font-bold text-amber-900">{product.rating}</span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">
              ({product.reviewsCount} {t('reviews')})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          
          {/* Price Block */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 font-medium">
              {t('inStock')} ({product.stock} left)
            </span>
          </div>

          {/* Add to Cart / Quantity Controller */}
          <div>
            {cartItem ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white text-emerald-800 hover:bg-emerald-100 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-extrabold text-emerald-900">
                  {cartItem.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('addToCart')}</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
