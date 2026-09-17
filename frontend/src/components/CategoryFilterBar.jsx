import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutGrid,
  Sprout,
  Sparkles,
  ShieldAlert,
  Tractor,
  HeartHandshake,
  ShoppingBag
} from 'lucide-react';

const categoryIcons = {
  all: LayoutGrid,
  seeds: Sprout,
  fertilizers: Sparkles,
  protection: ShieldAlert,
  machinery: Tractor,
  livestock: HeartHandshake,
  produce: ShoppingBag
};

export const CategoryFilterBar = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  isOrganicOnly,
  setIsOrganicOnly,
  sortBy,
  setSortBy,
  productCount = 0
}) => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      {/* Category Pills Header */}
      <div className="flex flex-col gap-4">
        
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              {lang === 'hi' ? "कृषि उत्पाद एवं सामग्री" : "Agricultural Products & Inputs"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {lang === 'hi'
                ? `कुल ${productCount} उत्पाद उपलब्ध - प्रमाणित गुणवत्ता एवं सीधा किसान मूल्य`
                : `Showing ${productCount} verified farming products with direct manufacturer & farmer rates`}
            </p>
          </div>
        </div>

        {/* Scrollable Category Cards Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => {
            const Icon = categoryIcons[cat.id] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all shrink-0 shadow-sm ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 ring-2 ring-emerald-600/30 shadow-emerald-900/20'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{lang === 'hi' ? cat.hindiName : cat.name}</span>
                {cat.itemCount && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-emerald-100' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm">
          
          {/* Organic Filter Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOrganicOnly(!isOrganicOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isOrganicOnly
                  ? 'bg-green-600 text-white border-green-700 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{t('organicOnly')}</span>
              {isOrganicOnly && <span className="text-[10px]">✓</span>}
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-semibold">{t('sortBy')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">{t('sortPopular')}</option>
              <option value="price_asc">{t('sortPriceLow')}</option>
              <option value="price_desc">{t('sortPriceHigh')}</option>
              <option value="rating">{t('sortRating')}</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
