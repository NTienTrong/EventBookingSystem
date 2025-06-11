// src/app/(auth)/login/page.tsx
'use client'; // Client Component

import Link from 'next/link';
import { useState, useEffect } from 'react';
// Import các component chung
import { Button, Input, Loading } from '@/components/common';
// Import Heroicons
import { UserIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Sử dụng outline icons

export default function LoginPage() {
  // Chúng ta sẽ dùng useState để quản lý giá trị input tạm thời
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Để demo trạng thái loading của nút
  const [error, setError] = useState<string | null>(null); // Để demo thông báo lỗi
  const [isPageLoading, setIsPageLoading] = useState(true); // Thêm state cho loading trang

  useEffect(() => {
    // Giả lập thời gian tải trang
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định

    // *** TẠM THỜI CHƯA CÓ LOGIC XỬ LÝ DỮ LIỆU HOẶC GỌI API ***
    // Chỉ mô phỏng trạng thái
    setIsLoading(true);
    setError(null);

    // Mô phỏng quá trình xử lý
    setTimeout(() => {
      setIsLoading(false);
      if (username === 'test' && password === 'password') {
        alert('Đăng nhập thành công!');
        // Ở đây trong thực tế sẽ chuyển hướng hoặc lưu session
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng (UI Demo).');
      }
      console.log('UI Demo: Username:', username, 'Password:', password);
    }, 1500);
  };

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="flex justify-center mb-6">
          {/* Logo hoặc biểu tượng lớn */}
          <div className="p-3 bg-indigo-100 rounded-full">
            <LockClosedIcon className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
        <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-900 font-sans">
          Chào mừng trở lại!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Tên đăng nhập"
            id="username"
            type="text"
            placeholder="Nhập tên đăng nhập của bạn"
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            id="password"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 flex items-center">
              <XMarkIcon className="h-5 w-5 mr-2" /> {error}
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full text-lg py-3">
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        <div className="mt-8 text-center text-base">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-200">
            Đăng ký ngay
          </Link>
        </div>

        {/* Tùy chọn: Thêm nút đăng nhập bên thứ 3 */}
        <div className="mt-6 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">Hoặc đăng nhập với</p>
          <Button 
            variant="outline" 
            className="w-full max-w-[300px] !py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Đăng nhập với Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}