const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

interface ApiError {
  detail?: string;
  [key: string]: unknown;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || JSON.stringify(error));
  }

  return response.json();
}

export const api = {
  // Auth endpoints
  register: (data: RegisterData) => 
    apiFetch<{ message: string }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  login: (email: string, password: string) =>
    apiFetch<TokenResponse>('/token/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  getMe: () => apiFetch<User>('/users/me/'),
  
  // Products (mock for now)
  getProducts: () => apiFetch<Product[]>('/products/'),
  getProduct: (id: string) => apiFetch<Product>(`/products/${id}/`),
  
  // Wholesalers (admin)
  getPendingWholesalers: () => apiFetch<User[]>('/admin/wholesalers/pending/'),
  approveWholesaler: (id: number) => 
    apiFetch<User>(`/admin/wholesalers/${id}/approve/`, { method: 'POST' }),
  rejectWholesaler: (id: number) => 
    apiFetch<User>(`/admin/wholesalers/${id}/reject/`, { method: 'POST' }),
};

// Types
export interface RegisterData {
  email: string;
  password: string;
  account_type: 'BUYER' | 'WHOLESALER';
  company_name?: string;
  city?: string;
  phone_business?: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  role: 'BUYER' | 'WHOLESALER' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  company_name?: string;
  city?: string;
  phone_business?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  moq: number;
  category: string;
  stock: number;
  images: string[];
  wholesaler: {
    id: number;
    company_name: string;
    city: string;
    verified: boolean;
    logo?: string;
  };
}
