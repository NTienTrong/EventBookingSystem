'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '@/components/common';

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Đặt vé thành công!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Cảm ơn bạn đã đặt vé. Chúng tôi đã gửi thông tin vé đến email của bạn.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push('/customer/tickets')}
          >
            <Download className="h-5 w-5" />
            Tải vé của tôi
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push('/customer/events')}
          >
            <ArrowRight className="h-5 w-5" />
            Xem thêm sự kiện
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              Kiểm tra email của bạn để xem chi tiết đơn hàng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 