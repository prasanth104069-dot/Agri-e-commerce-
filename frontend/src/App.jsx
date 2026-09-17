import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { api } from './services/api';

// Components
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { CropDoctorModal } from './components/CropDoctorModal';
import { FarmerSellModal } from './components/FarmerSellModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

import {
  Sprout,
  Search,
  SlidersHorizontal,
  Loader2,
  PackageOpen,
  Sparkles,
  Calculator,
  Stethoscope,
  PlusCircle,
  Truck,
  ShieldCheck
} from 'lucide-react';

const MainContent = () => {
  const { lang, t } = useLanguage();
  const {
    setIsCalculatorOpen,
    setIsCropDoctorOpen,
    setIsFarmerModalOpen,
    setIsTrackingOpen
  } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  // Load products & categories on start or when filters change
  useEffect(() => {
    loadCatalog();
  }, [selectedCategory, searchQuery, isOrganicOnly, sortBy]);

  const loadCatalog = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      if (isOrganicOnly) {
        params.isOrganic = 'true';
      }
      if (sortBy) {
        params.sort = sortBy;
      }

      const [prodRes, catRes] = await Promise.all([
        api.getProducts(params),
        api.getCategories()
      ]);

      if (prodRes.products) {
        setProducts(prodRes.products);
      }
      if (catRes.categories) {
        setCategories(catRes.categories);
      }
    } catch (err) {
      console.error('Failed to load catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    window.scrollTo({ top: 480, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-emerald-200">
      
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Hero Carousel & Seasonal Agri Alerts */}
      <HeroBanner onCategorySelect={handleCategorySelect} />

      {/* Category Pills & Filter Strip */}
      <CategoryFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isOrganicOnly={isOrganicOnly}
        setIsOrganicOnly={setIsOrganicOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        productCount={products.length}
      />

      {/* Main Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="text-xs font-semibold text-stone-600">Loading certified agricultural inputs...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
              <PackageOpen className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-base font-extrabold text-stone-800 mb-1">
              No products found matching your search.
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mb-4">
              Try removing filters, adjusting search keywords, or browse all agricultural categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setIsOrganicOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <FertilizerCalculator />
      <CropDoctorModal />
      <FarmerSellModal onProductAdded={loadCatalog} />
      <OrderTrackingModal />
      <ToastContainer />

      {/* Mobile Floating Action Bar for Farming Tools */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center justify-around gap-2 p-2 bg-stone-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-700 text-white text-[11px] font-bold">
        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-white/10 text-emerald-300"
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span>Calculator</span>
        </button>

        <div className="w-px h-6 bg-stone-700"></div>

        <button
          onClick={() => setIsCropDoctorOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-white/10 text-rose-300"
        >
          <Stethoscope className="w-4 h-4 mb-0.5" />
          <span>Crop Doctor</span>
        </button>

        <div className="w-px h-6 bg-stone-700"></div>

        <button
          onClick={() => setIsFarmerModalOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-white/10 text-amber-300"
        >
          <PlusCircle className="w-4 h-4 mb-0.5" />
          <span>Sell Crop</span>
        </button>
      </div>

      {/* Footer */}
      <Footer onCategorySelect={handleCategorySelect} />

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </LanguageProvider>
  );
}
