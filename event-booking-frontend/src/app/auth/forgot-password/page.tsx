'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // TODO: Implement forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setStatus('success');
      setMessage('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
    } catch (error) {
      setStatus('error');
      setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu? 🔑</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {message && (
            <div
              className={`${
                status === 'success' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
              } border px-4 py-3 rounded-lg text-sm`}
            >
              {message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center py-2.5"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Đang gửi...' : 'Gửi hướng dẫn đặt lại'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Nhớ ra mật khẩu?{' '}
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Quay lại đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 