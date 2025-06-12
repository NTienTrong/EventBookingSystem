'use client';

import { useState } from 'react';
import { Button } from '@/components/common';
import { Input } from '@/components/common';
import { Loading } from '@/components/common';
import Link from 'next/link';
import { events, bookings, users } from '@/data/mock';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export const AuthForm = ({ type, onSubmit, loading = false }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
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
        {type === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
            />
          </div>
        )}

        {type === 'register' && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </div>

        {type !== 'forgot-password' && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
            />
          </div>
        )}

        {type === 'register' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          {type === 'login' && 'Đăng nhập'}
          {type === 'register' && 'Đăng ký'}
          {type === 'forgot-password' && 'Gửi yêu cầu'}
        </Button>

        <div className="text-center text-sm">
          {type === 'login' && (
            <>
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Quên mật khẩu?
              </Link>
              <p className="mt-2">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
                  Đăng ký ngay
                </Link>
              </p>
            </>
          )}
          {type === 'register' && (
            <p>
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Đăng nhập
              </Link>
            </p>
          )}
          {type === 'forgot-password' && (
            <p>
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Quay lại đăng nhập
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}; 