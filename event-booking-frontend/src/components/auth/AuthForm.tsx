'use client';

import { useState } from 'react';
import { Button } from '@/components/common';
import { Input } from '@/components/common';
import { Loading } from '@/components/common';
import Link from 'next/link';
import { LoginCredentials, RegisterData, ForgotPasswordRequest } from '@/types/user';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
  onSubmit: (data: LoginCredentials | RegisterData | ForgotPasswordRequest) => Promise<void>;
  loading?: boolean;
}

export const AuthForm = ({ type, onSubmit, loading = false }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    let submitData;
    if (type === 'login') {
      submitData = {
        username: formData.username,
        password: formData.password,
      };
    } else if (type === 'register') {
      submitData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: 'USER',
      };
    } else {
      submitData = {
        email: formData.email,
      };
    }

    await onSubmit(submitData as any);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {type === 'login' && 'Đăng nhập'}
          {type === 'register' && 'Đăng ký tài khoản'}
          {type === 'forgot-password' && 'Quên mật khẩu'}
        </h1>
        <p className="text-gray-600">
          {type === 'login' && 'Chào mừng bạn quay trở lại!'}
          {type === 'register' && 'Tạo tài khoản để bắt đầu đặt vé sự kiện'}
          {type === 'forgot-password' && 'Nhập email để đặt lại mật khẩu'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'login' && (
          <>
            <Input
              label="Tên đăng nhập"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === 'register' && (
          <>
            <Input
              label="Tên đăng nhập"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Họ và tên"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Input
              label="Số điện thoại"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Input
              label="Địa chỉ"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </>
        )}

        {type === 'forgot-password' && (
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}

        <Button type="submit" className="w-full">
          {type === 'login' && 'Đăng nhập'}
          {type === 'register' && 'Đăng ký'}
          {type === 'forgot-password' && 'Gửi yêu cầu'}
        </Button>

        <div className="text-center mt-4">
          {type === 'login' && (
            <>
              <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
              <p className="mt-2">
                Chưa có tài khoản?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:underline">
                  Đăng ký ngay
                </Link>
              </p>
            </>
          )}
          {type === 'register' && (
            <p>
              Đã có tài khoản?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          )}
          {type === 'forgot-password' && (
            <p>
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Quay lại đăng nhập
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}; 