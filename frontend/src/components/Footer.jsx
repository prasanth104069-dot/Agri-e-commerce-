import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  Sprout,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Heart,
  Award,
  Calculator,
  Stethoscope,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';

export const Footer = ({ onCategorySelect }) => {
  const { lang, t } = useLanguage();
  const { setIsCalculatorOpen, setIsCropDoctorOpen, setIsFarmerModalOpen, showToast } = useCart();
  const [mandiPhone, setMandiPhone] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (mandiPhone.length >= 10) {
      showToast("🌾 Free Daily Mandi Rates & Weather SMS alerts activated for " + mandiPhone);
      setMandiPhone('');
    } else {
      showToast("Please enter a valid 10-digit mobile number", "error");
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 mt-16 border-t border-stone-800">
      
      {/* Top Banner: Free Advisory & Helpline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-4 h-4" />
              <span>National Kisan Advisory & Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'hi' ? "फसल से जुड़ी किसी भी समस्या के लिए सीधे बात करें" : "Have Questions About Seeds, Crop Diseases or Sowing?"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Our certified agronomists and soil experts are available 7 days a week (6 AM - 10 PM) for free technical guidance.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:18001801551"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>1800-180-1551 (Toll Free)</span>
            </a>

            <button
              onClick={() => setIsCropDoctorOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white font-bold text-sm transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-rose-400" />
              <span>{t('cropDoctor')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        
        {/* Col 1: About Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white font-bold shadow-md">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              {t('brandName')} <span className="text-emerald-400 text-xs uppercase font-bold">Direct</span>
            </span>
          </div>

          <p className="text-stone-400 leading-relaxed text-xs max-w-sm">
            AgriMart is India's leading digital agricultural marketplace connecting progressive farmers directly with certified seed breeders, organic fertilizer producers, and equipment manufacturers.
          </p>

          {/* Quick Mandi SMS Signup */}
          <div className="pt-2">
            <span className="font-bold text-stone-200 block mb-1.5">🌾 Free Daily Mandi Rates on SMS:</span>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="tel"
                value={mandiPhone}
                onChange={(e) => setMandiPhone(e.target.value)}
                placeholder="Enter 10-digit mobile..."
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shrink-0 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wider uppercase">Products</h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => onCategorySelect('seeds')} className="hover:text-emerald-400 transition-colors">
                High-Yield Hybrid Seeds
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('fertilizers')} className="hover:text-emerald-400 transition-colors">
                Organic Vermicompost & NPK
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('protection')} className="hover:text-emerald-400 transition-colors">
                Bio-Insecticides & Neem Oil
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('machinery')} className="hover:text-emerald-400 transition-colors">
                Battery Sprayers & Drip Kits
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('livestock')} className="hover:text-emerald-400 transition-colors">
                Cattle Feed & Mineral Mix
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('produce')} className="hover:text-emerald-400 transition-colors">
                Direct Farmer Produce
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Smart Tools */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wider uppercase">Kisan Tools</h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => setIsCalculatorOpen(true)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Dosage & Seed Calculator</span>
              </button>
            </li>
            <li>
              <button onClick={() => setIsCropDoctorOpen(true)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                <span>Crop Doctor Disease Tool</span>
              </button>
            </li>
            <li>
              <button onClick={() => setIsFarmerModalOpen(true)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sell Your Crop / Produce</span>
              </button>
            </li>
            <li>
              <a href="#pincode" className="hover:text-emerald-400 transition-colors">
                Pincode Delivery Estimator
              </a>
            </li>
            <li>
              <a href="#mandi" className="hover:text-emerald-400 transition-colors">
                Daily Mandi Price Index
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust & Guarantees */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wider uppercase">Agri Guarantees</h4>
          <div className="space-y-2.5 text-stone-400 text-[11px]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Certified Seeds tested under ICAR quality protocols</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Doorstep Delivery across 25,000+ Indian Pincodes</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero-risk Cash on Delivery (COD) supported</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-stone-800 text-stone-500 text-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} AgriMart Direct Technologies India Pvt. Ltd. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-stone-400">
          <span>Dedicated to the prosperity of Indian Farmers</span>
          <span className="text-emerald-500">🌾 जय जवान, जय किसान</span>
        </div>
      </div>

    </footer>
  );
};
