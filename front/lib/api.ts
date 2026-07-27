import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Auth
export const authApi = {
  register: (email: string, password: string) => api.post('/auth/register', { email, password }),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
};

// Categories
export const categoriesApi = {
  getAll: () => api.get('/categories'),
  create: (data: { name: string; description?: string }) => api.post('/categories', data),
  update: (id: string, data: { name?: string; description?: string }) => api.patch(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Expenses
export const expensesApi = {
  getAll: () => api.get('/expenses'),
  create: (data: { amount: number; description: string; date: string; categoryId?: string }) => api.post('/expenses', data),
  update: (id: string, data: object) => api.patch(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};

// Incomes
export const incomesApi = {
  getAll: () => api.get('/incomes'),
  create: (data: { amount: number; description: string; date: string }) => api.post('/incomes', data),
  update: (id: string, data: object) => api.patch(`/incomes/${id}`, data),
  delete: (id: string) => api.delete(`/incomes/${id}`),
};

export default api;
