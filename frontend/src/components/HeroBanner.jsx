import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  Sprout,
  ShieldCheck,
  Truck,
  TrendingUp,
  Award,
  ArrowRight,
  Calculator,
  Stethoscope,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const HeroBanner = ({ onCategorySelect }) => {
  const { lang, t } = useLanguage();
  const { setIsCalculatorOpen, setIsCropDoctorOpen, setIsFarmerModalOpen } = useCart();

  const slides = [
    {
      title: lang === 'hi' ? "प्रमाणित उच्च उपज बीज एवं हाइब्रिड फसलें" : "Certified High-Yield Hybrid Seeds & Crops",
      subtitle: lang === 'hi' ? "धान, गेहूं, कपास और सब्जियों के रोग-प्रतिरोधी बीज - बंपर पैदावार की गारंटी" : "Govt-certified, disease-resistant seeds for Paddy, Wheat, Cotton & Vegetables for bumper harvests.",
      badge: lang === 'hi' ? "🌱 खरीफ एवं रबी सीजन स्पेशल" : "🌱 Season Special Discounts",
      ctaText: lang === 'hi' ? "बीज सूची देखें" : "Explore Seeds",
      category: "seeds",
      bgGradient: "from-emerald-900 via-green-800 to-teal-950",
      accent: "from-amber-400 to-yellow-500",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: lang === 'hi' ? "100% शुद्ध जैविक केंचुआ खाद एवं बायो NPK" : "100% Organic Vermicompost & Soluble Bio-NPK",
      subtitle: lang === 'hi' ? "मिट्टी की उर्वरता बढ़ाएं और रासायनिक खर्चों में 40% तक की भारी बचत करें" : "Restore soil microbial vitality, retain moisture, and save up to 40% on chemical fertilizer costs.",
      badge: lang === 'hi' ? "✨ जैविक प्रमाणीकरण युक्त" : "✨ 100% Organic Certified",
      ctaText: lang === 'hi' ? "खाद व पोषण देखें" : "Shop Fertilizers",
      category: "fertilizers",
      bgGradient: "from-stone-900 via-emerald-950 to-green-900",
      accent: "from-emerald-400 to-green-500",
      image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: lang === 'hi' ? "किसान फसल डॉक्टर - तत्काल रोग व कीट निदान" : "Kisan Crop Doctor - Instant AI Disease Diagnostic",
      subtitle: lang === 'hi' ? "फसल में पीलापन, उकठा या कीड़ा लगा हो? तुरंत जांचें और सटीक उपाय व दवाई पाएं" : "Spot yellow leaves, stem borers, or blast disease? Diagnose instantly and order curated remedies.",
      badge: lang === 'hi' ? "🩺 निःशुल्क कृषि परामर्श" : "🩺 Free Farm Advisory",
      ctaText: lang === 'hi' ? "रोग जांचें (Crop Doctor)" : "Diagnose Crop Now",
      isDoctorAction: true,
      bgGradient: "from-teal-950 via-emerald-900 to-slate-900",
      accent: "from-rose-400 to-red-500",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22500?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      {/* Main Carousel Banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white shadow-2xl transition-all duration-700`}>
        
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 min-h-[380px]">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-200/90 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {slide.isDoctorAction ? (
                <button
                  onClick={() => setIsCropDoctorOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-rose-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onCategorySelect(slide.category)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sprout className="w-4 h-4" />
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>{t('dosageCalc')}</span>
              </button>
            </div>

            {/* Quick checkmarks */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Genuine Seeds</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cash on Delivery</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Farmer Wholesale</span>
              </span>
            </div>

          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Govt Verified Quality</div>
                  <div className="text-[11px] text-emerald-400">Tested Germination & Purity</div>
                </div>
                <Award className="w-6 h-6 text-amber-400 shrink-0" />
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Controls */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1.5 px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Trust & Advantage Badges Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
        
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">100% Genuine Products</h4>
            <p className="text-[11px] text-stone-500">Direct from certified brands</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Village Gate Delivery</h4>
            <p className="text-[11px] text-stone-500">25,000+ Pincodes covered</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Bulk Farmer Discounts</h4>
            <p className="text-[11px] text-stone-500">Save up to 10% on bundles</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Kisan Technical Support</h4>
            <p className="text-[11px] text-stone-500">Free agronomist advice</p>
          </div>
        </div>

      </div>

    </div>
  );
};
