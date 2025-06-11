// src/app/(auth)/register/page.tsx
'use client'; // Client Component

import Link from 'next/link';
import { useState, useEffect } from 'react';
// Import các component chung
import { Button, Input, Loading } from '@/components/common';
// Import Heroicons
import { UserIcon, EnvelopeIcon, LockClosedIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    // Chỉ mô phỏng trạng thái và một số validation cơ bản cho UI
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự.');
        setIsLoading(false);
        return;
    }
    // Mô phỏng quá trình xử lý
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      console.log('UI Demo: Register Data:', { username, email, password });
      // Ở đây trong thực tế sẽ chuyển hướng đến trang đăng nhập
    }, 2000);
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
            <UserIcon className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
        <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-900">
          Tham gia với chúng tôi!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Tên đăng nhập"
            id="reg-username"
            type="text"
            placeholder="Tên đăng nhập của bạn"
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            id="reg-email"
            type="email"
            placeholder="email@example.com"
            icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            id="reg-password"
            type="password"
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Xác nhận mật khẩu"
            id="reg-confirm-password"
            type="password"
            placeholder="Xác nhận lại mật khẩu"
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 flex items-center">
              <XMarkIcon className="h-5 w-5 mr-2" /> {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" /> {success}
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full text-lg py-3">
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
        </form>

        <div className="mt-8 text-center text-base">
          Đã có tài khoản?{' '}
          <Link href="/login" className="font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-200">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}