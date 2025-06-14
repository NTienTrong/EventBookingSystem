import axios from 'axios';
import { User } from '@/types/user';
import { LoginCredentials, RegisterData, ForgotPasswordRequest, ResetPasswordRequest } from '@/types/user';

const API_URL = 'http://localhost:8080/api';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; accessToken: string }> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('accessToken');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/auth/forgot-password`, data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/auth/reset-password`, data);
  },
}; 