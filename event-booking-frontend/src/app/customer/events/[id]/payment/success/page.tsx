'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Download,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/common';

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (!storedOrder) {
      router.push(`/customer/events/${params.id}/booking`);
      return;
    }

    try {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderData(parsedOrder);

      // Clear current order from localStorage
      localStorage.removeItem('currentOrder');

      // Auto redirect after 10 seconds
      const timer = setTimeout(() => {
        router.push('/customer/orders');
      }, 10000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error parsing order data:', error);
      router.push(`/customer/events/${params.id}/booking`);
    }
  }, [params.id, router]);

  const handleDownloadTicket = () => {
    if (!orderData) return;
    // TODO: Implement ticket download
    console.log('Downloading ticket for order:', orderData.orderId);
  };

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-500 mb-8">
          Cảm ơn bạn đã đặt vé. Chúng tôi đã gửi thông tin vé đến email của bạn.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mã đơn hàng:</span>
              <span className="font-medium text-gray-900">#{orderData.orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sự kiện:</span>
              <span className="font-medium text-gray-900">{orderData.eventName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Loại vé:</span>
              <span className="font-medium text-gray-900">{orderData.ticketType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Số lượng:</span>
              <span className="font-medium text-gray-900">{orderData.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phương thức thanh toán:</span>
              <span className="font-medium text-gray-900">{orderData.paymentMethod}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(orderData.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadTicket}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Tải vé
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/customer/orders')}
            className="flex items-center gap-2"
          >
            Xem đơn hàng
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Bạn sẽ được chuyển hướng đến trang đơn hàng sau 10 giây...
        </p>
      </div>
    </div>
  );
} 