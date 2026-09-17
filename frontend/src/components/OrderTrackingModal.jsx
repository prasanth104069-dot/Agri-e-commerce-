import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import {
  X,
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  FileText,
  Phone,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const OrderTrackingModal = () => {
  const { lang, t } = useLanguage();
  const { isTrackingOpen, setIsTrackingOpen, trackingOrderId, setTrackingOrderId } = useCart();

  const [searchId, setSearchId] = useState(trackingOrderId || 'AGRI-ORD-8942');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isTrackingOpen) {
      if (trackingOrderId) {
        setSearchId(trackingOrderId);
        fetchOrder(trackingOrderId);
      } else {
        fetchOrder(searchId);
      }
    }
  }, [isTrackingOpen, trackingOrderId]);

  const fetchOrder = async (idToSearch) => {
    if (!idToSearch) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.getOrderById(idToSearch);
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        setError(`Order with ID "${idToSearch}" was not found.`);
        setOrder(null);
      }
    } catch (e) {
      setError('Could not retrieve tracking details right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrder(searchId);
  };

  if (!isTrackingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
                {lang === 'hi' ? "लाइव ऑर्डर ट्रैकिंग एवं डिलीवरी स्थिति" : "Live Farm Order Tracking"}
              </h2>
              <p className="text-xs text-stone-500">
                Track seed, fertilizer, and machinery logistics to your village gate
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50/50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Package className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. AGRI-ORD-8942)..."
                className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </form>

          {error && (
            <div className="mt-2 text-xs text-rose-600 font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* Tracking Details */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {order ? (
            <div className="space-y-6">
              
              {/* Order Status Badge & Info */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Order ID: {order.orderId}
                  </span>
                  <div className="text-base font-extrabold text-emerald-950 mt-0.5">
                    Estimated Delivery: {order.estimatedDelivery}
                  </div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Shipping to: {order.customer?.address || "Farm Gate"}
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-extrabold shadow-sm">
                  ● {order.status}
                </div>
              </div>

              {/* Live Timeline Stepper */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
                  Logistics Progress:
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {(order.trackingTimeline || [
                    { stage: "Order Confirmed & Quality Inspected", time: "Completed", done: true },
                    { stage: "Dispatched from Regional Hub", time: "In-Progress", done: true },
                    { stage: "In Transit via Rural Logistics", time: "Expected in 1 day", done: false },
                    { stage: "Delivered to Doorstep / Farm Gate", time: "Expected in 2 days", done: false }
                  ]).map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.done
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <div className="text-xs">
                        <div className={`font-bold ${step.done ? 'text-stone-900' : 'text-stone-500'}`}>
                          {step.stage}
                        </div>
                        <div className="text-[11px] text-stone-400">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Order */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <h4 className="font-bold text-stone-900 mb-3">Items in this Consignment:</h4>
                <div className="divide-y divide-stone-200">
                  {order.items?.map((item, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="font-bold text-stone-900 truncate">{item.name}</div>
                          <div className="text-stone-500 text-[11px]">Qty: {item.quantity} • {item.unit}</div>
                        </div>
                      </div>
                      <div className="font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between font-extrabold text-stone-900">
                  <span>Total Consignment Value:</span>
                  <span className="text-emerald-800">₹{order.total?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Customer Support Helpline */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Need help with delivery? Call Kisan Express Support: <strong>1800-180-1551</strong></span>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-8 text-stone-400">
              <p className="text-xs">Enter your 10-digit mobile number or Order ID to inspect live dispatch updates.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
