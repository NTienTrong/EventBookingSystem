import api from './api';
import { User, LoginCredentials, RegisterData, ForgotPasswordRequest, ResetPasswordRequest, UserDTO } from '@/types/user';
import Cookies from 'js-cookie';

export const authApi = {
  login: async (username: string, password: string) => {
    console.log('Attempting to login with username:', username); // Debug log
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response:', response.data); // Debug log
    
    const { accessToken, user } = response.data;
    
    // Store token in cookie
    Cookies.set('token', accessToken, {
      expires: 7,
      path: '/',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:'
    });
    
    // Store user info in localStorage
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    Cookies.remove('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    console.log('Getting current user...'); // Debug log
    const token = Cookies.get('token');
    console.log('Token from cookie:', token); // Debug log
    
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
    await api.post('/auth/forgot-password', data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await api.post('/auth/reset-password', data);
  },
}; 