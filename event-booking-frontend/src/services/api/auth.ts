import axios from 'axios';
import { User, LoginCredentials, RegisterData, ForgotPasswordRequest, ResetPasswordRequest, UserDTO } from '@/types/user';
import Cookies from 'js-cookie';
import api from './api';

const API_URL = 'http://localhost:8080/api';

export const authApi = {
  login: async (username: string, password: string) => {
    console.log('Attempting to login with username:', username, 'and password:', password); // Debug log to inspect actual values
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response:', response.data); // Debug log
    
    const { accessToken, user } = response.data;
    console.log('Access token:', accessToken); // Debug log
    console.log('User data:', user); // Debug log
    
    // Store token and user info in localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', JSON.stringify(user)); // Store full user object
    
    // Set token in axios default headers
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log('Token set in axios headers:', api.defaults.headers.common['Authorization']); // Debug log
    
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user'); // Remove full user object as well
    delete api.defaults.headers.common['Authorization'];
  },

  getCurrentUser: async () => {
    console.log('Getting current user...'); // Debug log
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Debug log
    
    if (!token) {
      console.log('No token found'); // Debug log
      throw new Error('No token found');
    }
    
    const role = localStorage.getItem('role');
    console.log('Role from localStorage:', role); // Debug log
    
    if (!role) {
      console.log('No role found'); // Debug log
      throw new Error('No role found');
    }

    let response;
    if (role === 'CUSTOMER') {
      response = await api.get('/customers/profile');
    } else {
      const username = localStorage.getItem('username');
      if (!username) {
        console.log('No username found'); // Debug log
        throw new Error('No username found');
      }
      response = await api.get(`/users/username/${username}`);
    }
    
    console.log('Current user response:', response.data); // Debug log
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/auth/forgot-password`, data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/auth/reset-password`, data);
  },
}; 