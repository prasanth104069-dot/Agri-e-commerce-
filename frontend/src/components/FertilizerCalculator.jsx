import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import {
  X,
  Calculator,
  Sprout,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FertilizerCalculator = () => {
  const { lang, t } = useLanguage();
  const { isCalculatorOpen, setIsCalculatorOpen, addBundleToCart } = useCart();

  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState('crop-rice');
  const [acreage, setAcreage] = useState(2);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCalculatorOpen) {
      fetchCropsAndCalculate();
    }
  }, [isCalculatorOpen]);

  const fetchCropsAndCalculate = async () => {
    setLoading(true);
    try {
      const cropsRes = await api.getCrops();
      if (cropsRes.crops && cropsRes.crops.length > 0) {
        setCrops(cropsRes.crops);
        runCalculation(selectedCropId || cropsRes.crops[0].id, acreage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const runCalculation = async (cropId, acres) => {
    setLoading(true);
    try {
      const res = await api.calculateFertilizer(cropId, acres);
      if (res.calculations) {
        setResults(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCropChange = (e) => {
    const id = e.target.value;
    setSelectedCropId(id);
    runCalculation(id, acreage);
  };

  const handleAcreageChange = (val) => {
    const num = Math.max(0.5, Number(val) || 1);
    setAcreage(num);
    runCalculation(selectedCropId, num);
  };

  const handleAddBundle = () => {
    if (results && results.recommendedBundle) {
      addBundleToCart(results.recommendedBundle);
      setIsCalculatorOpen(false);
    }
  };

  if (!isCalculatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-gradient-to-r from-emerald-900 to-green-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 border border-emerald-500 flex items-center justify-center text-amber-300 shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {t('calculatorTitle')}
              </h2>
              <p className="text-xs text-emerald-200">
                {t('calculatorSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* Controls: Crop & Acreage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            
            {/* Select Crop */}
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('selectCrop')}
              </label>
              <select
                value={selectedCropId}
                onChange={handleCropChange}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              >
                {crops.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.season} Season • {c.durationDays})
                  </option>
                ))}
              </select>
            </div>

            {/* Farm Area in Acres */}
            <div className="md:col-span-6">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t('enterAcreage')}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 5, 10].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAcreageChange(preset)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                        acreage === preset
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {preset} Ac
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={acreage}
                  onChange={(e) => handleAcreageChange(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-extrabold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
                <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Acres (एकड़)</span>
              </div>
            </div>

          </div>

          {/* Results Grid */}
          {results && (
            <div className="space-y-6">
              
              {/* Dosage Requirement Summary Cards */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Calculated Inputs Required for {acreage} Acre(s) {results.crop}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  {/* Seeds */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block">Certified Seeds</span>
                    <div className="text-xl font-black text-emerald-950 mt-1">
                      {results.calculations.seedRequired}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">Optimal Seed Rate</span>
                  </div>

                  {/* Urea */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider block">Nitrogen (Urea)</span>
                    <div className="text-base sm:text-lg font-black text-amber-950 mt-1">
                      {results.calculations.fertilizerRequirements.urea.split('(')[0]}
                    </div>
                    <span className="text-[10px] text-amber-700 font-semibold block">
                      ({results.calculations.fertilizerRequirements.urea.split('(')[1]}
                    </span>
                  </div>

                  {/* DAP */}
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-blue-800 tracking-wider block">Phosphorus (DAP)</span>
                    <div className="text-base sm:text-lg font-black text-blue-950 mt-1">
                      {results.calculations.fertilizerRequirements.dap.split('(')[0]}
                    </div>
                    <span className="text-[10px] text-blue-700 font-semibold block">
                      ({results.calculations.fertilizerRequirements.dap.split('(')[1]}
                    </span>
                  </div>

                  {/* Vermicompost */}
                  <div className="p-3.5 rounded-2xl bg-stone-100 border border-stone-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-stone-700 tracking-wider block">Organic Compost</span>
                    <div className="text-base sm:text-lg font-black text-stone-900 mt-1">
                      {results.calculations.fertilizerRequirements.organicVermicompost.split('(')[0]}
                    </div>
                    <span className="text-[10px] text-stone-600 font-semibold block">
                      ({results.calculations.fertilizerRequirements.organicVermicompost.split('(')[1]}
                    </span>
                  </div>

                </div>
              </div>

              {/* Stage-wise Application Guide */}
              {results.calculations.growthStages && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                  <h4 className="font-bold text-stone-900 uppercase text-[11px] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>Split Application Timeline (कब और कितनी खाद दें):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.calculations.growthStages.map((stg, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <div className="font-extrabold text-emerald-800">{stg.stage}</div>
                        <div className="text-stone-600 mt-0.5 leading-snug">{stg.advice}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Product Kit in Store */}
              {results.recommendedBundle && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-extrabold text-emerald-950 text-sm">
                        Curated Product Kit for {acreage} Acre(s)
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Ready-to-order bundle containing exact seeds, bio-fertilizer, and crop protection
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-500 font-medium">Estimated Kit Price: </span>
                      <span className="text-lg font-black text-emerald-900">₹{results.estimatedBundleCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {results.recommendedBundle.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-emerald-200 shadow-xs">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="font-bold text-stone-900 truncate">{item.name}</div>
                          <div className="text-stone-500 text-[11px]">Recommended: {item.recommendedQuantity} x {item.unit}</div>
                          <div className="font-extrabold text-emerald-800">₹{item.itemTotal.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Bundle Button */}
                  <div className="mt-4 pt-3 border-t border-emerald-200 flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddBundle}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm shadow-md shadow-emerald-700/25 transition-all transform active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('addBundleToCart')}</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
