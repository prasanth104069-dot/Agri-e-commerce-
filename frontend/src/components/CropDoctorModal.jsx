import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import {
  X,
  Stethoscope,
  Search,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowRight,
  HelpCircle,
  Bug
} from 'lucide-react';

export const CropDoctorModal = () => {
  const { lang, t } = useLanguage();
  const { isCropDoctorOpen, setIsCropDoctorOpen, addToCart, setSelectedProduct } = useCart();

  const [diseases, setDiseases] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCropDoctorOpen) {
      loadDiseases();
    }
  }, [isCropDoctorOpen, selectedCrop]);

  const loadDiseases = async () => {
    setLoading(true);
    try {
      const res = await api.getDiseases(selectedCrop);
      if (res.diseases) {
        setDiseases(res.diseases);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isCropDoctorOpen) return null;

  const filtered = diseases.filter(d => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      d.symptomName.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      (d.hindiCrop && d.hindiCrop.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-700/80 border border-rose-500 flex items-center justify-center text-rose-200 shadow-md">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {t('cropDoctorTitle')}
              </h2>
              <p className="text-xs text-rose-200">
                {t('cropDoctorSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCropDoctorOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symptom (e.g. yellow leaf, leaf curl, root rot, blast)..."
              className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Crop Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['all', 'Tomato', 'Paddy', 'Wheat', 'Cotton'].map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selectedCrop === c
                    ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {c === 'all' ? 'All Crops' : c}
              </button>
            ))}
          </div>

        </div>

        {/* Diagnostic Cards List */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Bug className="w-12 h-12 mx-auto mb-2 text-stone-300" />
              <p className="text-sm font-semibold">No disease diagnostic matches found.</p>
              <p className="text-xs text-stone-400">Try searching for other symptoms or select "All Crops".</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm hover:border-rose-300 hover:shadow-md transition-all space-y-4"
              >
                
                {/* Title & Badge */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 border border-rose-200">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-stone-500">
                        Affects: {item.crop}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-stone-900 mt-1">
                      {item.symptomName}
                    </h3>
                  </div>
                </div>

                {/* Symptoms & Cause */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <span className="font-bold text-amber-900 block mb-0.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('symptomsObserved')}:</span>
                    </span>
                    <p className="text-amber-950 font-medium leading-relaxed">
                      {item.symptoms}
                    </p>
                    <div className="text-[11px] text-amber-700 mt-1 font-semibold">Cause: {item.cause}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="font-bold text-emerald-900 block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Organic & Chemical Remedy:</span>
                    </span>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {item.organicRemedy}
                    </p>
                    <div className="text-[11px] text-emerald-700 mt-1 font-semibold">Action: {item.immediateAction}</div>
                  </div>
                </div>

                {/* Recommended Remedy Products from live catalog */}
                {item.remedyProducts && item.remedyProducts.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold text-stone-700 mb-2">
                      {t('recommendedProducts')}:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.remedyProducts.map(prod => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-stone-900 truncate">
                                {prod.name}
                              </h5>
                              <div className="text-[11px] text-emerald-700 font-extrabold">
                                ₹{prod.price} <span className="text-stone-400 font-normal">/ {prod.unit}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => addToCart(prod, 1)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
