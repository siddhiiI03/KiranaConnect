// frontend/src/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('kirana_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const createProduct = (data) => API.post('/products', data);
export const getProducts = () => API.get('/products');
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const createOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders/my');
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const dispatchOrder = (id) => API.put(`/orders/${id}/dispatch`);

export const getProfile = () => API.get('/users/profile');
export const updateProfile = (data) => API.put('/users/profile', data);
export const getSettings = () => API.get('/users/settings');
export const updateSettings = (data) => API.put('/users/settings', data);

export const getAnalytics = () => API.get('/analytics');
export const getSupportTickets = () => API.get('/support/tickets');
export const createSupportTicket = (data) => API.post('/support/tickets', data);

export default API;