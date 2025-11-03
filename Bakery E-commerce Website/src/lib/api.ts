import { storage } from './storage';
import { Product, Category, Order, Review, User } from '../types';

const API_BASE = 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface AddToCartRequest {
  productId: string;
  quantity: number;
}

interface CartResponse {
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  total: number;
}

interface CreateOrderRequest {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Fetch wrapper with error handling
let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

async function refreshAccessToken() {
  if (isRefreshing) {
    return new Promise<void>((resolve) => {
      refreshQueue.push(resolve);
    });
  }

  isRefreshing = true;
  try {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data: ApiResponse<TokenResponse> = await response.json();
    if (data.data) {
      storage.setAccessToken(data.data.accessToken);
      storage.setRefreshToken(data.data.refreshToken);
      return data.data;
    }
    throw new Error('Invalid token response');
  } catch (error) {
    storage.clearAuth();
    throw error;
  } finally {
    isRefreshing = false;
    refreshQueue.forEach((resolve) => resolve());
    refreshQueue = [];
  }
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  
  const accessToken = storage.getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  let response = await fetch(url, { ...options, headers });

  // Handle 401 - token might be expired
  if (response.status === 401) {
    const refreshToken = storage.getRefreshToken();
    if (refreshToken && !endpoint.includes('/auth/')) {
      try {
        await refreshAccessToken();
        
        // Retry original request with new token
        const newAccessToken = storage.getAccessToken();
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        response = await fetch(url, { ...options, headers });
      } catch (error) {
        // Refresh failed, clear auth and reject
        storage.clearAuth();
        throw error;
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// ============ AUTH ENDPOINTS ============
export async function login(req: LoginRequest) {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(req),
  });

  if (response.data) {
    storage.setUser({
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      role: response.data.role,
    });
    storage.setAccessToken(response.data.accessToken);
    storage.setRefreshToken(response.data.refreshToken);
  }

  return response.data!;
}

export async function register(req: RegisterRequest) {
  const response = await apiFetch<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(req),
  });

  if (response.data) {
    storage.setUser({
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      role: response.data.role,
    });
    storage.setAccessToken(response.data.accessToken);
    storage.setRefreshToken(response.data.refreshToken);
  }

  return response.data!;
}

export async function logout() {
  storage.clearAuth();
  storage.clearCart();
}

export async function getProfile() {
  const response = await apiFetch<User>('/auth/profile');
  return response.data!;
}

// ============ PRODUCT ENDPOINTS ============
export async function getProducts(params?: { search?: string; categoryId?: string }) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.categoryId) queryParams.append('categoryId', params.categoryId);

  const query = queryParams.toString();
  const endpoint = query ? `/products?${query}` : '/products';
  
  const response = await apiFetch<Product[]>(endpoint);
  return response.data || [];
}

export async function getProductById(id: string) {
  const response = await apiFetch<Product>(`/products/${id}`);
  return response.data!;
}

// ============ CATEGORY ENDPOINTS ============
export async function getCategories() {
  const response = await apiFetch<Category[]>('/categories');
  return response.data || [];
}

export async function getCategoryById(id: string) {
  const response = await apiFetch<Category>(`/categories/${id}`);
  return response.data!;
}

// ============ CART ENDPOINTS ============
export async function getCart() {
  const response = await apiFetch<CartResponse>('/cart');
  return response.data!;
}

export async function addToCart(req: AddToCartRequest) {
  const response = await apiFetch<CartResponse>('/cart/items', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function updateCartItem(itemId: string, quantity: number) {
  const response = await apiFetch<CartResponse>(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
  return response.data!;
}

export async function removeCartItem(itemId: string) {
  const response = await apiFetch<CartResponse>(`/cart/items/${itemId}`, {
    method: 'DELETE',
  });
  return response.data!;
}

export async function clearCart() {
  await apiFetch('/cart', {
    method: 'DELETE',
  });
}

// ============ ORDER ENDPOINTS ============
export async function createOrder(req: CreateOrderRequest) {
  const response = await apiFetch<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function getOrders() {
  const response = await apiFetch<Order[]>('/orders');
  return response.data || [];
}

export async function getOrderById(id: string) {
  const response = await apiFetch<Order>(`/orders/${id}`);
  return response.data!;
}

// ============ FEEDBACK/REVIEW ENDPOINTS ============
export async function getProductReviews(productId: string) {
  const response = await apiFetch<Review[]>(`/feedback/product/${productId}`);
  return response.data || [];
}

export async function createReview(req: {
  productId: string;
  rating: number;
  comment: string;
}) {
  const response = await apiFetch<Review>('/feedback', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  return response.data!;
}

// ============ NOTIFICATION ENDPOINTS ============
export async function getNotifications() {
  const response = await apiFetch<Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
  }>>('/notifications');
  return response.data || [];
}

export async function markNotificationAsRead(id: string) {
  const response = await apiFetch(`/notifications/mark-read/${id}`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  return response.success;
}

export async function deleteNotification(id: string) {
  const response = await apiFetch(`/notifications/${id}`, {
    method: 'DELETE',
  });
  return response.success;
}

// ============ ADMIN ENDPOINTS ============
export async function adminGetAllOrders() {
  const response = await apiFetch<Order[]>('/orders/admin/all');
  return response.data || [];
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  const response = await apiFetch<Order>(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return response.data!;
}

export async function adminCreateProduct(req: Partial<Product>) {
  const response = await apiFetch<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function adminUpdateProduct(id: string, req: Partial<Product>) {
  const response = await apiFetch<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function adminDeleteProduct(id: string) {
  const response = await apiFetch(`/products/${id}`, {
    method: 'DELETE',
  });
  return response.success;
}

export async function adminCreateCategory(req: Partial<Category>) {
  const response = await apiFetch<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function adminUpdateCategory(id: string, req: Partial<Category>) {
  const response = await apiFetch<Category>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(req),
  });
  return response.data!;
}

export async function adminDeleteCategory(id: string) {
  const response = await apiFetch(`/categories/${id}`, {
    method: 'DELETE',
  });
  return response.success;
}
