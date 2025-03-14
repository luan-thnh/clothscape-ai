
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Product API calls
export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const createProduct = (productData: any) => api.post('/products', productData);
export const updateProduct = (id: string, productData: any) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

// Auth API calls
export const register = (userData: any) => api.post('/auth/signup', userData);
export const login = (credentials: any) => api.post('/auth/login', credentials);

// Order API calls
export const createOrder = (orderData: any) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const getOrder = (id: string) => api.get(`/orders/${id}`);
export const getUserOrders = (userId: string) => api.get(`/orders/user/${userId}`);
export const updateOrderStatus = (id: string, status: string) => api.put(`/orders/${id}`, { status });

// User API calls
export const getUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, userData: any) => api.put(`/users/${id}`, userData);

// AI API calls
export const searchProductsAI = (query: string, userId?: string) => 
  api.post('/ai/search', { query, userId });

export const getRecommendations = (userId?: string, productId?: string) => 
  api.post('/ai/recommendations', { userId, productId });

export const trackUserActivity = (type: 'view' | 'purchase' | 'cart', productId: string) => 
  api.post('/ai/track', { type, productId });

export const chatbotQuery = (query: string, userId?: string) => 
  api.post('/ai/chatbot', { query, userId });

export default api;
