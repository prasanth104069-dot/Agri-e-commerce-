# 🌾 AgriMart - Modern Agriculture & Farming E-Commerce Platform

A high-performance full-stack agricultural e-commerce platform built for farmers, agricultural suppliers, and consumers to buy and sell certified seeds, fertilizers, crop protection bio-pesticides, farming machinery, irrigation tools, and farm-gate produce.

---

## 🚀 Live Local URLs
- **Frontend App**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## ✨ Key Features & Capabilities

### 1. 🌾 Agricultural Product Catalog
- **Categories**:
  - **Seeds & Hybrids**: High-yield paddy (MTU 1010), certified wheat (HD-2967), hybrid tomato F1, sweet corn, Bt cotton.
  - **Fertilizers & Soil Health**: 100% organic earthworm vermicompost, water-soluble bio-NPK 19:19:19, seaweed bio-stimulant, chelated micronutrient zinc/boron mix.
  - **Crop Protection**: Cold-pressed pure neem oil 10,000 PPM, Trichoderma Viride bio-fungicide, Mancozeb+Carbendazim.
  - **Farm Machinery & Tools**: 16L 2-in-1 dual battery knapsack sprayer, automatic drip irrigation kit (100 plants), digital 4-in-1 soil pH & moisture tester, SK5 orchard shears.
  - **Livestock & Cattle Feed**: High-energy cattle feed pellets (22% protein), Doodh-Dhara liquid calcium tonic.
  - **Direct Farm Produce**: Organic Royal 1121 Basmati Rice, raw multiflora farm honey, yellow soybean.
- **Bilingual Interface**: Seamless instant toggle between **English** and **हिन्दी**.
- **Real-time Search & Multi-criteria Filters**: Filter by organic/bio certification, category, price range, brand, and sorting.
- **Detailed Agricultural Specifications**: Application dosage, split schedules, ICAR/Govt license numbers, and crop suitability tags.

### 2. 🧪 Smart Fertilizer & Seed Rate Calculator
- Select your crop (Rice, Wheat, Tomato, Cotton, Corn) and enter farm land acreage (e.g., 2 Acres, 5 Acres).
- Automatically calculates:
  - Exact seed requirement in kg
  - Recommended Urea, DAP, MOP Potash, and Vermicompost in kg and standard bag counts
  - Stage-by-stage crop growth guidance (Basal, Tillering, Jointing, Grain Filling)
  - **1-Click "Add Recommended Bundle to Cart"**!

### 3. 🩺 Kisan Crop Doctor (Disease & Pest AI Diagnostic)
- Search or filter crop disease symptoms (Yellow leaf curl, blast disease, root rot, powdery mildew, aphids/thrips).
- Provides immediate actions, 100% organic remedies, and links directly to curative products in the catalog.

### 4. 🚜 Farmer Direct Marketplace ("Sell Your Harvest")
- Farmers and local FPOs (Farmer Producer Organizations) can list their harvest with custom photos, prices, unit packaging (kg, quintal, bag), and organic certifications.

### 5. 🛒 Smart Cart, Bulk Farmer Discounts & Rural Checkout
- **Bulk Discount Engine**: Automatic 5% discount for 4+ items and 10% discount for 8+ items.
- **Pincode Delivery Estimator**: Instant delivery ETA and local hub lookup across 25,000+ Indian pincodes.
- **Flexible Payment Methods**:
  - 💵 **Cash on Delivery (COD)**
  - 📱 **UPI / QR Code Pay** (PhonePe, Google Pay, Paytm, BHIM)
  - 💳 **Kisan Credit Card / Net Banking**
  - 🌱 **Pay on Harvest (Zero-Interest Agri Credit Simulation)**
- **Printable Tax Invoice & Live Logistics Timeline** (Confirmed -> Hub Packed -> Dispatched -> Village Gate Delivery).

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Backend**: Node.js & Express.js REST API
- **State Management**: React Context API (`CartContext`, `LanguageContext`) with LocalStorage persistence

---

## 📦 How to Run

### Start Backend API Server:
```bash
cd backend
npm install
node server.js
# Backend runs on http://localhost:5000
```

### Start Frontend Application:
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```
