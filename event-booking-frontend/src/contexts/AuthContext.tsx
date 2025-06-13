'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Khôi phục trạng thái đăng nhập từ cookies khi load trang
    const storedUser = Cookies.get('user');
    const storedToken = Cookies.get('token');
    
    console.log('=== Auth Context Init ===');
    console.log('Stored user cookie:', storedUser);
    console.log('Stored token cookie:', storedToken);
    console.log('Current cookies:', document.cookie);
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user data:', parsedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
        // Nếu có lỗi, xóa cookies không hợp lệ
        Cookies.remove('user');
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (newUser: User, newToken: string) => {
    console.log('=== Auth Context Login ===');
    console.log('Setting user:', newUser);
    console.log('Setting token:', newToken);
    
    setUser(newUser);
    setToken(newToken);
    
    // Lưu vào cookies với đầy đủ options
    const cookieOptions = {
      expires: 7, // 7 days
      path: '/',
      sameSite: 'lax' as const,
      secure: window.location.protocol === 'https:',
      domain: window.location.hostname === 'localhost' ? undefined : window.location.hostname
    };

    console.log('Setting cookies with options:', cookieOptions);
    console.log('Current domain:', window.location.hostname);
    console.log('Current protocol:', window.location.protocol);

    try {
      Cookies.set('user', JSON.stringify(newUser), cookieOptions);
      Cookies.set('token', newToken, cookieOptions);

      // Verify cookies were set
      const verifyUser = Cookies.get('user');
      const verifyToken = Cookies.get('token');
      console.log('Verify cookies after set:');
      console.log('User cookie:', verifyUser);
      console.log('Token cookie:', verifyToken);
      console.log('All cookies:', document.cookie);

      if (!verifyUser || !verifyToken) {
        console.error('Failed to set cookies!');
      }
    } catch (error) {
      console.error('Error setting cookies:', error);
    }
  };

  const logout = () => {
    console.log('=== Auth Context Logout ===');
    setUser(null);
    setToken(null);
    
    // Xóa cookies với đầy đủ options
    const cookieOptions = {
      path: '/',
      domain: window.location.hostname === 'localhost' ? undefined : window.location.hostname
    };
    
    Cookies.remove('user', cookieOptions);
    Cookies.remove('token', cookieOptions);
    console.log('Cookies removed');
    console.log('Remaining cookies:', document.cookie);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 