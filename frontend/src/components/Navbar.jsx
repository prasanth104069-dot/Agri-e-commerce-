import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  Sprout,
  Search,
  ShoppingBag,
  Heart,
  PhoneCall,
  Calculator,
  Stethoscope,
  PlusCircle,
  Truck,
  MapPin,
  Globe,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = []
}) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const {
    cartCount,
    subtotal,
    setIsCartOpen,
    wishlist,
    setIsCalculatorOpen,
    setIsCropDoctorOpen,
    setIsFarmerModalOpen,
    setIsTrackingOpen,
    userPincode,
    pincodeInfo
  } = useCart();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      {/* Top Agricultural Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Helpline & Gov Support */}
          <div className="flex items-center gap-4">
            <a
              href="tel:18001801551"
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('kisanHelpline')}</span>
            </a>
            <span className="hidden md:inline text-emerald-400/50">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('freeDeliveryText')}</span>
            </span>
          </div>

          {/* Right: Pincode, Language Toggle & Track Order */}
          <div className="flex items-center gap-4">
            {/* Delivery Pincode */}
            <div className="hidden sm:flex items-center gap-1 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Delivering to: <strong>{userPincode}</strong> ({pincodeInfo.hub?.split(' ')[0]})</span>
            </div>

            <span className="text-emerald-400/50">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700/60 hover:bg-emerald-600 text-white font-semibold transition-all border border-emerald-600"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                    {t('brandName')}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Direct
                  </span>
                </div>
                <span className="hidden sm:block text-[11px] font-medium text-stone-500 -mt-0.5">
                  {t('tagline')}
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Category Dropdown */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center w-full rounded-xl border-2 border-emerald-600/30 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/10 bg-stone-50 overflow-hidden transition-all shadow-inner">
              
              {/* Category selector button */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-100 border-r border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors whitespace-nowrap"
                >
                  <span>
                    {categories.find(c => c.id === selectedCategory)?.name || t('allCategories')}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {isCategoryMenuOpen && (
                  <div className="absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => { setSelectedCategory('all'); setIsCategoryMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-emerald-50 transition-colors ${
                        selectedCategory === 'all' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-stone-700'
                      }`}
                    >
                      {t('allCategories')}
                    </button>
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setIsCategoryMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-emerald-50 transition-colors ${
                          selectedCategory === cat.id ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-stone-700'
                        }`}
                      >
                        {lang === 'hi' ? cat.hindiName : cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-transparent px-3.5 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-stone-400 hover:text-stone-600 font-bold"
                >
                  ✕
                </button>
              )}

              <button
                type="button"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Kisan Services & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Farmer Sell Button */}
            <button
              onClick={() => setIsFarmerModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all shadow-sm group"
            >
              <PlusCircle className="w-4 h-4 text-amber-600 group-hover:rotate-90 transition-transform" />
              <span>{t('sellHarvest')}</span>
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors"
              title="Track Order"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{t('trackOrder')}</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                // If there are wishlisted items, we can filter or alert
              }}
              className="relative p-2.5 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-rose-600 transition-colors"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-md shadow-emerald-600/25 transition-all transform active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-emerald-100 uppercase font-semibold">{t('cart')}</span>
                <span className="text-xs font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </button>

          </div>

        </div>

        {/* Agricultural Helper Ribbon */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar text-xs">
          
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-semibold uppercase text-[10px] tracking-wider hidden sm:inline">
              Smart Tools:
            </span>

            {/* Fertilizer & Seed Calculator */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold transition-all shrink-0"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('dosageCalc')}</span>
            </button>

            {/* Crop Doctor Diagnostic */}
            <button
              onClick={() => setIsCropDoctorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold transition-all shrink-0"
            >
              <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('cropDoctor')}</span>
            </button>

            {/* Mobile Sell Harvest */}
            <button
              onClick={() => setIsFarmerModalOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold transition-all shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('farmerPortal')}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-stone-500 font-medium text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Mandi Updates & Seed Booking Active
            </span>
          </div>

        </div>

      </div>
    </header>
  );
};
