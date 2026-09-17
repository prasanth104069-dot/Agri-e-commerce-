import { initialProducts, initialCategories, cropAdvisoryData, cropDiseasesDatabase } from '../data/fallbackData.js';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

// Local storage cache for client-side persistence in static deployments
let localProducts = [...initialProducts];
try {
  const saved = localStorage.getItem('agrimart_custom_products');
  if (saved) {
    const parsed = JSON.parse(saved);
    localProducts = [...parsed, ...initialProducts];
  }
} catch (e) {
  // ignore
}

export const api = {
  // Products
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/products${query ? `?${query}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      // Fallback below
    }

    // Client-side fallback filter
    let result = [...localProducts];
    if (params.category && params.category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.suitableCrops && p.suitableCrops.some(c => c.toLowerCase().includes(q)))
      );
    }
    if (params.isOrganic === 'true') {
      result = result.filter(p => p.isOrganic === true);
    }
    if (params.sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'popular') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return {
      success: true,
      total: result.length,
      products: result
    };
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
    const product = localProducts.find(p => p.id === id);
    return { success: Boolean(product), product };
  },

  async createProduct(productData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }

    const newProd = {
      id: `custom-${Date.now()}`,
      ...productData,
      rating: 5.0,
      reviewsCount: 1,
      badge: 'Farmer Direct'
    };
    localProducts.unshift(newProd);
    try {
      localStorage.setItem('agrimart_custom_products', JSON.stringify([newProd]));
    } catch (e) {}

    return { success: true, product: newProd };
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
    return { success: true, categories: initialCategories };
  },

  // Crop Advisory & Calculator
  async getCrops() {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/crops`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
    return { success: true, crops: cropAdvisoryData };
  },

  async calculateFertilizer(cropId, acreage) {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/calculate-fertilizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId, acreage })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }

    const acres = Number(acreage) || 1;
    const crop = cropAdvisoryData.find(c => c.id === cropId) || cropAdvisoryData[0];
    const seedTotalKg = crop.seedRatePerAcreKg * acres;
    const ureaTotalKg = crop.fertilizerDosePerAcre.ureaKg * acres;
    const dapTotalKg = crop.fertilizerDosePerAcre.dapKg * acres;
    const mopTotalKg = crop.fertilizerDosePerAcre.mopKg * acres;
    const vermicompostTotalKg = crop.fertilizerDosePerAcre.vermicompostKg * acres;

    const recommendedBundle = crop.suggestedProducts.map(sp => {
      const matchedProduct = localProducts.find(p => p.id === sp.id);
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

    return {
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
      estimatedBundleCost: recommendedBundle.reduce((a, b) => a + b.itemTotal, 0)
    };
  },

  async getDiseases(crop = 'all') {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/diseases?crop=${crop}`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }

    let list = cropDiseasesDatabase;
    if (crop && crop !== 'all') {
      list = list.filter(d => d.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    const enriched = list.map(d => ({
      ...d,
      remedyProducts: d.recommendedProductIds.map(pid => localProducts.find(p => p.id === pid)).filter(Boolean)
    }));
    return { success: true, diseases: enriched };
  },

  // Pincode Delivery Check
  async checkPincode(pincode) {
    try {
      const res = await fetch(`${API_BASE_URL}/pincode/${pincode}`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
    return {
      success: true,
      pincode,
      hub: 'Central Kisan Logistics Hub',
      estimatedDays: '2 - 3 Business Days',
      codAvailable: true
    };
  },

  // Orders
  async createOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }

    const orderId = `AGRI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      ...orderData,
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    return { success: true, order: newOrder };
  },

  async getOrderById(orderId) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
    return {
      success: true,
      order: {
        orderId,
        status: 'In Transit',
        estimatedDelivery: new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        trackingTimeline: [
          { stage: 'Order Confirmed & Quality Inspected', time: 'Completed', done: true },
          { stage: 'Dispatched from Regional Hub', time: 'In-Progress', done: true },
          { stage: 'In Transit via Rural Logistics', time: 'Expected in 1 day', done: false },
          { stage: 'Delivered to Doorstep / Farm Gate', time: 'Expected in 2 days', done: false }
        ]
      }
    };
  }
};
