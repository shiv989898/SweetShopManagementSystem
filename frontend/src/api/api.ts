import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Auth API
export const authAPI = {
  register: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { email, password }),
  
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
};

// Sweets API
export const sweetsAPI = {
  getAll: () => api.get<Sweet[]>('/sweets'),
  
  search: (params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) =>
    api.get<Sweet[]>('/sweets/search', { params }),
  
  create: (sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>) =>
    api.post<Sweet>('/sweets', sweet),
  
  update: (id: number, updates: Partial<Sweet>) =>
    api.put<Sweet>(`/sweets/${id}`, updates),
  
  delete: (id: number) =>
    api.delete(`/sweets/${id}`),
  
  purchase: (id: number, quantity?: number) =>
    api.post<Sweet>(`/sweets/${id}/purchase`, { quantity }),
  
  restock: (id: number, quantity: number) =>
    api.post<Sweet>(`/sweets/${id}/restock`, { quantity }),
};

export default api;
