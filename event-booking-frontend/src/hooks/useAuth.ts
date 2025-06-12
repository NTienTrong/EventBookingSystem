'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User, LoginCredentials, RegisterData } from '@/types/user';
import { mockUsers } from '@/data/mock/users';
import { mockCredentials } from '@/data/mock/auth';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // In mock environment, we'll just use the admin user
        setUser(mockUsers[0]);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      // Check if credentials match mock data
      if (
        (credentials.email === mockCredentials.admin.email && 
         credentials.password === mockCredentials.admin.password) ||
        (credentials.email === mockCredentials.customer.email && 
         credentials.password === mockCredentials.customer.password)
      ) {
        const user = mockUsers.find(u => u.email === credentials.email);
        if (user) {
          setUser(user);
          localStorage.setItem('accessToken', 'mock-token');
          return user;
        }
      }
      throw new Error('Email hoặc mật khẩu không chính xác');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      // Create new customer user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email: data.email,
        fullName: data.name,
        phone: data.phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('accessToken', 'mock-token');
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      // Mock forgot password - just check if email exists
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Email không tồn tại trong hệ thống');
      }
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    try {
      // Mock reset password - always succeeds
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
};
