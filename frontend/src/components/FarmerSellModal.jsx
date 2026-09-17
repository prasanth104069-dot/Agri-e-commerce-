import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import {
  X,
  PlusCircle,
  Sprout,
  Upload,
  CheckCircle2,
  Image,
  ShieldCheck,
  Building,
  Tag
} from 'lucide-react';

export const FarmerSellModal = ({ onProductAdded }) => {
  const { lang, t } = useLanguage();
  const { isFarmerModalOpen, setIsFarmerModalOpen, showToast } = useCart();

  const [formData, setFormData] = useState({
    name: "Desi Organic Yellow Soybean (Harvest 2024)",
    hindiName: "देसी जैविक पीला सोयाबीन (ताजा उपज)",
    category: "produce",
    subCategory: "Pulses & Grains",
    brand: "Malwa Kisan Producer Org (FPO)",
    price: 4800,
    originalPrice: 5400,
    unit: "1 Quintal (100 kg)",
    stock: 50,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
    description: "Naturally sun-dried, pesticide-free harvest of high-oil soybean directly from member farmers of Malwa FPO.",
    farmerName: "Malwa Krishi Producer Company",
    location: "Ujjain, Madhya Pradesh"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isFarmerModalOpen) return null;

  const sampleImages = [
    { label: "Grains & Crops", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80" },
    { label: "Organic Veggies", url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
    { label: "Organic Compost", url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80" },
    { label: "Farm Honey", url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        hindiName: formData.hindiName,
        category: formData.category,
        subCategory: formData.subCategory,
        brand: formData.brand,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        unit: formData.unit,
        stock: Number(formData.stock),
        isOrganic: formData.isOrganic,
        image: formData.image,
        description: formData.description,
        manufacturerInfo: {
          name: formData.farmerName,
          license: "FSSAI / FPO-REGISTERED",
          origin: formData.location
        }
      };

      const res = await api.createProduct(payload);
      if (res.success || res.product) {
        showToast("🌾 Your agricultural product is now LIVE in the marketplace!");
        if (onProductAdded) onProductAdded();
        setIsFarmerModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      showToast("Could not list product right now", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-gradient-to-r from-amber-700 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/80 border border-amber-400 flex items-center justify-center text-amber-100 shadow-md">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {lang === 'hi' ? "किसान बाज़ार - अपनी उपज / उत्पाद बेचें" : "Farmer Portal - List Your Produce / Agri Product"}
              </h2>
              <p className="text-xs text-amber-200">
                Direct sale to 50,000+ verified buyers with zero intermediary commission
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFarmerModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 flex-1">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">Product / Crop Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Certified HD-2967 Wheat Grain"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                >
                  <option value="produce">Direct Farm Produce / Grains</option>
                  <option value="seeds">Seeds & Hybrids</option>
                  <option value="fertilizers">Fertilizers & Vermicompost</option>
                  <option value="protection">Crop Protection & Bio-Pesticides</option>
                  <option value="machinery">Farming Tools & Equipment</option>
                  <option value="livestock">Livestock & Cattle Feed</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Unit / Packaging *</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g. 50 kg Sack, 1 Quintal, 5 kg Bag"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Price in INR"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Original / Market Price M.R.P (₹)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="M.R.P."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Stock Quantity Available *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Farmer / FPO / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value, brand: e.target.value })}
                  placeholder="e.g. Kisan Samiti, Ratlam"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">Farm Location / Origin *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Village Pipariya, Dist Indore, Madhya Pradesh"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                
                {/* Preset sample images */}
                <div className="flex items-center gap-2 mt-1.5 overflow-x-auto">
                  <span className="text-[10px] text-stone-500 font-semibold">Quick Photos:</span>
                  {sampleImages.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: s.url })}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 border border-stone-200 text-[10px] text-stone-700"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">Quality & Harvest Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your crop moisture levels, purity, germination or cultivation methods..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <input
                    type="checkbox"
                    checked={formData.isOrganic}
                    onChange={(e) => setFormData({ ...formData, isOrganic: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-emerald-900">Certified 100% Organic / Pesticide-Free Produce</span>
                    <p className="text-[10px] text-emerald-700">Display organic certified badge on your product listing</p>
                  </div>
                </label>
              </div>

            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFarmerModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold shadow-md transition-all disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isSubmitting ? "Publishing Product..." : "List Product on AgriMart"}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
