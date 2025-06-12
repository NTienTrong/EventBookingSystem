export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'admin' | 'customer';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserFilter {
  search?: string;
  role?: User['role'];
  page?: number;
  limit?: number;
} 