// src/api.js
import axios from 'axios';

const API_URL = 'http://172.20.105.98  :3003';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/api/users/login', credentials);
export const fetchOTSales = (page, pageSize) => api.post(`/v1/OTsales?page=${page}&pageSize=${pageSize}`);
export const fetchSalesReport = (page, pageSize) => api.post(`/v1/SalesRepo0?page=${page}&pageSize=${pageSize}`);
export const createUser = (user) => api.post('/api/users/register', user);
export const resetPassword = (user) => api.post('/api/users/reset-password', user);
export const fetchCustomerData = (page, pageSize, filter) => {
  const { buyerName } = filter;
  const queryParams = `?page=${page}&pageSize=${pageSize}&buyerName=${buyerName}`;
  return api.post(`/v1/CustomerData${queryParams}`);
};

export const exportCustomerData = (filter) => {
  const { buyerName, frequencyYear, rankYear, totalFrequency } = filter;
  const queryParams = `?buyerName=${buyerName}&frequencyYear=${frequencyYear}&rankYear=${rankYear}&totalFrequency=${totalFrequency}`;
  return api.get(`/v1/export-CustomerData${queryParams}`, {
    responseType: 'blob',
  });
};



export default api;
