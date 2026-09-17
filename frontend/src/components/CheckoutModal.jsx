import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Clock,
  Printer,
  FileText,
  Building,
  User,
  Phone,
  MapPin,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const CheckoutModal = () => {
  const { lang, t } = useLanguage();
  const {
    cart,
    cartCount,
    subtotal,
    bulkDiscount,
    shippingFee,
    grandTotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    userPincode,
    setIsTrackingOpen,
    setTrackingOrderId
  } = useCart();

  const [step, setStep] = useState(1); // 1: Details & Payment, 2: Success & Invoice
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Rameshwar Patel",
    phone: "9876543210",
    email: "rameshwar.patel@kisanmail.com",
    villageAddress: "House No 42, Main Road, Gram Pipariya, Tehsil Sanwer",
    district: "Indore",
    state: "Madhya Pradesh",
    pincode: userPincode || "452001",
    landHoldingAcre: "5 Acres",
    notes: "Please deliver near the village cooperative society building."
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.villageAddress}, ${formData.district}, ${formData.state}`,
        pincode: formData.pincode
      },
      items: cart,
      subtotal,
      bulkDiscount,
      shippingFee,
      total: grandTotal,
      paymentMethod
    };

    try {
      const response = await api.createOrder(orderPayload);
      const order = response.order || {
        orderId: `AGRI-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        customer: orderPayload.customer,
        items: cart,
        total: grandTotal,
        paymentMethod,
        status: "Confirmed",
        estimatedDelivery: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setCreatedOrder(order);
      setStep(2);
      clearCart();

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleViewLiveTracking = () => {
    if (createdOrder) {
      setTrackingOrderId(createdOrder.orderId);
      setIsCheckoutOpen(false);
      setIsTrackingOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-stone-900">
                {step === 1 ? (lang === 'hi' ? "किसान चेकआउट एवं सुरक्षित भुगतान" : "Farmer Checkout & Secure Delivery") : (lang === 'hi' ? "ऑर्डर पुष्टिकरण" : "Order Confirmation")}
              </h2>
              <p className="text-[11px] text-stone-500">
                {step === 1 ? "100% Guaranteed Genuine Agro Inputs" : "Your order has been recorded successfully"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1">
          
          {step === 1 ? (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Order summary mini strip */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-emerald-900 font-bold">{cartCount} Items in Order</span>
                  <span className="text-emerald-700 block text-[11px]">Includes Seed & Soil Nutrition packages</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 font-medium">Total Amount: </span>
                  <span className="text-base font-black text-emerald-900">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Delivery Details Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>1. Farmer Delivery Details (डिलीवरी पता)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Full Name (पूरा नाम) *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rameshwar Patel"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Mobile Number (मोबाइल नंबर) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-semibold mb-1">Village / Tehsil / House Address (गाँव / तहसील / पता) *</label>
                    <input
                      type="text"
                      name="villageAddress"
                      required
                      value={formData.villageAddress}
                      onChange={handleChange}
                      placeholder="e.g. Village Pipariya, Near Gram Panchayat"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">District (जिला) *</label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Indore"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Pincode (पिनकोड) *</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit Pincode"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span>2. Payment Option (भुगतान विधि)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod("Cash on Delivery")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "Cash on Delivery"
                        ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-white border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={() => setPaymentMethod("Cash on Delivery")}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                        <span>💵 Cash on Delivery (COD)</span>
                        <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">Recommended</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Pay in cash when goods arrive at your farm or village doorstep.
                      </p>
                    </div>
                  </label>

                  {/* UPI QR Code */}
                  <label
                    onClick={() => setPaymentMethod("UPI / QR Online Pay")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "UPI / QR Online Pay"
                        ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-white border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "UPI / QR Online Pay"}
                      onChange={() => setPaymentMethod("UPI / QR Online Pay")}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">📱 UPI / QR Code (Instant)</div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        PhonePe, Google Pay, Paytm, or BHIM QR payment.
                      </p>
                    </div>
                  </label>

                  {/* Kisan Credit Card */}
                  <label
                    onClick={() => setPaymentMethod("Kisan Card / Net Banking")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "Kisan Card / Net Banking"
                        ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-white border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "Kisan Card / Net Banking"}
                      onChange={() => setPaymentMethod("Kisan Card / Net Banking")}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">🌾 Kisan Credit Card / Cards</div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Supports Rupay Kisan Cards, SBI, HDFC & PNB agri cards.
                      </p>
                    </div>
                  </label>

                  {/* Pay on Harvest */}
                  <label
                    onClick={() => setPaymentMethod("Pay on Harvest (Agri Credit)")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "Pay on Harvest (Agri Credit)"
                        ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-white border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "Pay on Harvest (Agri Credit)"}
                      onChange={() => setPaymentMethod("Pay on Harvest (Agri Credit)")}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">🌱 Pay Post-Harvest (Agri Credit)</div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Zero interest 60-day credit for verified farmer accounts.
                      </p>
                    </div>
                  </label>

                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/30 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmitting ? "Placing Order..." : `Confirm Order (₹${grandTotal.toLocaleString('en-IN')})`}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Step 2: Order Success & Invoice Receipt */
            <div className="space-y-6">
              
              <div className="text-center space-y-2 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h2 className="text-2xl font-extrabold text-stone-900">
                  {t('orderSuccess')}
                </h2>

                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your agri-inputs order has been registered and dispatched from our regional seed & fertilizer warehouse.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-300 text-xs font-mono font-bold text-stone-900">
                  <span>{t('orderIdText')}:</span>
                  <span className="text-emerald-700">{createdOrder?.orderId}</span>
                </div>
              </div>

              {/* Invoice Card */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-4">
                
                <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                  <div>
                    <div className="font-extrabold text-emerald-900 text-sm">AgriMart Direct India Pvt Ltd</div>
                    <div className="text-stone-500">Tax Invoice & Delivery Receipt</div>
                    <div className="text-stone-400 text-[10px]">GSTIN: 23AABCA1234F1Z8</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-stone-800">Date: {new Date().toLocaleDateString('en-IN')}</div>
                    <div className="text-stone-500">Est. Delivery: {createdOrder?.estimatedDelivery}</div>
                  </div>
                </div>

                {/* Customer info */}
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="font-semibold text-stone-900">Delivery Address:</span>
                    <div>{formData.fullName}</div>
                    <div className="text-stone-500">{formData.villageAddress}, {formData.district} - {formData.pincode}</div>
                    <div className="text-stone-500">Phone: {formData.phone}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-stone-900">Payment:</span>
                    <div className="font-bold text-emerald-800">{paymentMethod}</div>
                    <div className="text-stone-500">Status: {createdOrder?.paymentStatus || "Pending COD"}</div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-stone-100 text-stone-700 font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Item</th>
                        <th className="p-2.5 text-center">Qty</th>
                        <th className="p-2.5 text-right">Price</th>
                        <th className="p-2.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {createdOrder?.items?.map((it, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium text-stone-800">{it.name}</td>
                          <td className="p-2.5 text-center">{it.quantity}</td>
                          <td className="p-2.5 text-right">₹{it.price}</td>
                          <td className="p-2.5 text-right font-bold">₹{it.price * it.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Calculation */}
                <div className="space-y-1 text-right text-stone-600">
                  <div>Subtotal: ₹{subtotal.toLocaleString('en-IN')}</div>
                  {bulkDiscount > 0 && <div className="text-emerald-700 font-semibold">Bulk Farmer Discount: -₹{bulkDiscount.toLocaleString('en-IN')}</div>}
                  <div>Delivery Charges: {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</div>
                  <div className="text-base font-extrabold text-stone-900 pt-1 border-t border-stone-200">
                    Grand Total: ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('downloadInvoice')}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleViewLiveTracking}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{t('trackMyOrder')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-semibold text-xs"
                  >
                    {t('continueShopping')}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
