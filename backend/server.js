import express from 'express';
import cors from 'cors';
import { initialProducts, initialCategories } from './data/products.js';
import { cropAdvisoryData, cropDiseasesDatabase } from './data/advisoryData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store with state preservation
let products = [...initialProducts];
let categories = [...initialCategories];
let orders = [
  {
    orderId: "AGRI-ORD-8942",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      fullName: "Rameshwar Patel",
      phone: "+91 98765 43210",
      pincode: "452001",
      address: "Village Pipariya, Tehsil Sanwer, Dist Indore",
      state: "Madhya Pradesh"
    },
    items: [
      {
        id: "fert-01",
        name: "100% Organic Earthworm Vermicompost",
        price: 399,
        quantity: 4,
        unit: "25 kg Bag",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "prot-01",
        name: "BioNeem 10,000 PPM Pure Azadirachtin Organic Insecticide",
        price: 750,
        quantity: 1,
        unit: "1 Litre Bottle",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 2346,
    bulkDiscount: 117.3,
    shippingFee: 0,
    total: 2228.7,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending Delivery",
    status: "Shipped",
    estimatedDelivery: new Date(Date.now() + 86400000).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
    trackingTimeline: [
      { stage: "Order Confirmed", time: "2 days ago", done: true },
      { stage: "Packed & Quality Checked at Hub", time: "Yesterday", done: true },
      { stage: "Dispatched via Krishi Express Logistics", time: "Today morning", done: true },
      { stage: "Out for Village Delivery", time: "Tomorrow", done: false }
    ]
  }
];

// 1. GET ALL PRODUCTS (with filtering, search, sorting)
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, isOrganic, sort, brand } = req.query;
  let result = [...products];

  // Category filter
  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search keyword
  if (search) {
    const q = search.toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.suitableCrops && p.suitableCrops.some(c => c.toLowerCase().includes(q)))
    );
  }

  // Organic filter
  if (isOrganic === 'true') {
    result = result.filter(p => p.isOrganic === true);
  }

  // Brand filter
  if (brand && brand !== 'all') {
    result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  // Price Range
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // Sorting
  if (sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'popular') {
    result.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  res.json({
    success: true,
    total: result.length,
    products: result
  });
});

// 2. GET SINGLE PRODUCT DETAILS
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Related products
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({
    success: true,
    product,
    related
  });
});

// 3. CREATE / LIST NEW PRODUCT (Farmer / Supplier Marketplace)
app.post('/api/products', (req, res) => {
  const {
    name,
    hindiName,
    category,
    subCategory,
    brand,
    price,
    originalPrice,
    unit,
    stock,
    isOrganic,
    image,
    description,
    dosageGuide,
    suitableCrops,
    manufacturerInfo
  } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
  }

  const newProduct = {
    id: `custom-${Date.now()}`,
    name,
    hindiName: hindiName || name,
    category: category || 'produce',
    subCategory: subCategory || 'Farm Harvest',
    brand: brand || 'Local Farmer Direct',
    price: Number(price),
    originalPrice: Number(originalPrice || price),
    unit: unit || '1 kg',
    rating: 5.0,
    reviewsCount: 1,
    stock: Number(stock || 50),
    isOrganic: Boolean(isOrganic),
    badge: 'Farmer Direct',
    image: image || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    description: description || 'Direct farm-fresh harvest produced with care.',
    dosageGuide: dosageGuide || 'Natural farm produce ready for use.',
    suitableCrops: suitableCrops || ['Farm Fresh'],
    features: ['Direct farmer listing', 'Quality assured', 'Freshly harvested'],
    manufacturerInfo: manufacturerInfo || {
      name: 'Local Certified Grower',
      license: 'FARM-DIR-2024',
      origin: 'Direct Farm Gate'
    }
  };

  products.unshift(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product listed successfully on AgriMart!',
    product: newProduct
  });
});

// 4. GET CATEGORIES
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    categories
  });
});

// 5. CROP ADVISORY & FERTILIZER DOSAGE CALCULATOR
app.get('/api/advisory/crops', (req, res) => {
  res.json({
    success: true,
    crops: cropAdvisoryData
  });
});

app.post('/api/advisory/calculate-fertilizer', (req, res) => {
  const { cropId, acreage, soilCondition } = req.body;
  const acres = Number(acreage) || 1;

  const crop = cropAdvisoryData.find(c => c.id === cropId) || cropAdvisoryData[0];

  const seedTotalKg = crop.seedRatePerAcreKg * acres;
  const ureaTotalKg = crop.fertilizerDosePerAcre.ureaKg * acres;
  const dapTotalKg = crop.fertilizerDosePerAcre.dapKg * acres;
  const mopTotalKg = crop.fertilizerDosePerAcre.mopKg * acres;
  const vermicompostTotalKg = crop.fertilizerDosePerAcre.vermicompostKg * acres;

  // Recommended bundles from live products
  const recommendedBundle = crop.suggestedProducts.map(sp => {
    const matchedProduct = products.find(p => p.id === sp.id);
    const calculatedQty = Math.max(1, Math.ceil(sp.quantity * acres));
    return {
      productId: sp.id,
      name: matchedProduct ? matchedProduct.name : sp.name,
      unit: matchedProduct ? matchedProduct.unit : sp.unit,
      price: matchedProduct ? matchedProduct.price : 500,
      image: matchedProduct ? matchedProduct.image : '',
      recommendedQuantity: calculatedQty,
      itemTotal: (matchedProduct ? matchedProduct.price : 500) * calculatedQty
    };
  });

  const estimatedBundleCost = recommendedBundle.reduce((acc, curr) => acc + curr.itemTotal, 0);

  res.json({
    success: true,
    crop: crop.name,
    acres,
    calculations: {
      seedRequired: `${seedTotalKg.toFixed(1)} Kg`,
      fertilizerRequirements: {
        urea: `${ureaTotalKg} Kg (${Math.ceil(ureaTotalKg / 45)} Bags of 45kg)`,
        dap: `${dapTotalKg} Kg (${Math.ceil(dapTotalKg / 50)} Bags of 50kg)`,
        mopPotash: `${mopTotalKg} Kg (${Math.ceil(mopTotalKg / 50)} Bags of 50kg)`,
        organicVermicompost: `${vermicompostTotalKg} Kg (${Math.ceil(vermicompostTotalKg / 25)} Bags of 25kg)`
      },
      growthStages: crop.growthStages
    },
    recommendedBundle,
    estimatedBundleCost
  });
});

// 6. CROP DOCTOR & DISEASE DIAGNOSTICS
app.get('/api/advisory/diseases', (req, res) => {
  const { crop } = req.query;
  let list = cropDiseasesDatabase;
  if (crop && crop !== 'all') {
    list = list.filter(d => d.crop.toLowerCase().includes(crop.toLowerCase()));
  }

  // Enrich with recommended products
  const enriched = list.map(d => {
    const remedies = d.recommendedProductIds.map(pid => products.find(p => p.id === pid)).filter(Boolean);
    return {
      ...d,
      remedyProducts: remedies
    };
  });

  res.json({
    success: true,
    diseases: enriched
  });
});

// 7. PINCODE CHECKER (Rural & Urban Delivery Estimator)
app.get('/api/pincode/:code', (req, res) => {
  const code = req.params.code;
  if (!code || code.length !== 6 || isNaN(code)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 6-digit Pincode' });
  }

  const prefix = code.substring(0, 2);
  let hub = "Central Agri Logistics Hub";
  let estimatedDays = 3;
  let codAvailable = true;

  if (prefix === '45' || prefix === '46') {
    hub = "Indore Agro Delivery Center";
    estimatedDays = 2;
  } else if (prefix === '11' || prefix === '12' || prefix === '13' || prefix === '14') {
    hub = "North India Krishi Distribution Hub";
    estimatedDays = 2;
  } else if (prefix === '50' || prefix === '51' || prefix === '52' || prefix === '53' || prefix === '56' || prefix === '60') {
    hub = "South India Agri Logistics Terminal";
    estimatedDays = 2;
  } else if (prefix === '38' || prefix === '39' || prefix === '40' || prefix === '41' || prefix === '42') {
    hub = "Western Rural Express Hub";
    estimatedDays = 2;
  } else {
    estimatedDays = 4;
  }

  res.json({
    success: true,
    pincode: code,
    hub,
    estimatedDays: `${estimatedDays} - ${estimatedDays + 1} Business Days`,
    codAvailable,
    freeDeliveryThreshold: "Free delivery on orders above ₹999",
    tractorDeliveryAvailable: "Available for bulk orders > 500 kg"
  });
});

// 8. ORDERS MANAGEMENT
app.post('/api/orders', (req, res) => {
  const { customer, items, paymentMethod, subtotal, bulkDiscount, shippingFee, total } = req.body;

  if (!customer || !customer.fullName || !customer.phone || !customer.pincode || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required order details or empty cart' });
  }

  const orderId = `AGRI-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    customer,
    items,
    subtotal: subtotal || items.reduce((a, b) => a + (b.price * b.quantity), 0),
    bulkDiscount: bulkDiscount || 0,
    shippingFee: shippingFee || 0,
    total: total || subtotal,
    paymentMethod: paymentMethod || "Cash on Delivery",
    paymentStatus: paymentMethod === "UPI / QR Online Pay" || paymentMethod === "Kisan Card / Net Banking" ? "Paid" : "Pending Delivery",
    status: "Confirmed",
    estimatedDelivery: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
    trackingTimeline: [
      { stage: "Order Confirmed & Payment Verified", time: "Just now", done: true },
      { stage: "Dispatched from Agro Warehouse", time: "Within 24 Hours", done: false },
      { stage: "In-Transit via Rural Fast Logistics", time: "2 Days", done: false },
      { stage: "Delivered to Farm Gate / Doorstep", time: "3 Days", done: false }
    ]
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! Delivery tracking initiated.',
    order: newOrder
  });
});

app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    orders
  });
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId.toUpperCase() === req.params.orderId.toUpperCase());
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order ID not found' });
  }
  res.json({
    success: true,
    order
  });
});

// ROOT HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Healthy',
    platform: 'AgriMart E-Commerce Platform API',
    version: '1.0.0',
    productsCount: products.length,
    ordersCount: orders.length
  });
});

app.listen(PORT, () => {
  console.log(`🌾 AgriMart Backend API running on http://localhost:${PORT}`);
});
