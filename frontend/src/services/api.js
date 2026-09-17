const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/products${query ? `?${query}` : ''}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    } catch (err) {
      console.warn('API getProducts fallback:', err);
      // Fallback response if backend is offline
      return { success: false, error: err.message };
    }
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch (err) {
      console.warn('API getProductById fallback:', err);
      return { success: false, error: err.message };
    }
  },

  async createProduct(productData) {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      console.warn('API createProduct error:', err);
      return { success: false, error: err.message };
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      return await res.json();
    } catch (err) {
      console.warn('API getCategories error:', err);
      return { success: false };
    }
  },

  // Crop Advisory & Calculator
  async getCrops() {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/crops`);
      return await res.json();
    } catch (err) {
      console.warn('API getCrops error:', err);
      return { success: false };
    }
  },

  async calculateFertilizer(cropId, acreage) {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/calculate-fertilizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId, acreage })
      });
      return await res.json();
    } catch (err) {
      console.warn('API calculateFertilizer error:', err);
      return { success: false };
    }
  },

  async getDiseases(crop = 'all') {
    try {
      const res = await fetch(`${API_BASE_URL}/advisory/diseases?crop=${crop}`);
      return await res.json();
    } catch (err) {
      console.warn('API getDiseases error:', err);
      return { success: false };
    }
  },

  // Pincode Delivery Check
  async checkPincode(pincode) {
    try {
      const res = await fetch(`${API_BASE_URL}/pincode/${pincode}`);
      return await res.json();
    } catch (err) {
      console.warn('API checkPincode error:', err);
      return { success: false };
    }
  },

  // Orders
  async createOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch (err) {
      console.warn('API createOrder error:', err);
      return { success: false, error: err.message };
    }
  },

  async getOrderById(orderId) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      return await res.json();
    } catch (err) {
      console.warn('API getOrderById error:', err);
      return { success: false, error: err.message };
    }
  }
};
