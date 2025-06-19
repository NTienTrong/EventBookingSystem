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

      // Auto redirect after 10 seconds
      // const timer = setTimeout(() => {
      //   localStorage.removeItem('currentOrder');
      //   router.push('/customer/orders');
      // }, 10000);

      // return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error parsing order data:', error);
      router.push(`/customer/events/${params.id}/booking`);
    }
  }, [params.id, router]);

  const handleGoToOrders = () => {
    localStorage.removeItem('currentOrder');
    router.push('/customer/orders');
  };

  if (!orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg text-xl font-semibold mb-6">
          Thanh toán thành công! Cảm ơn bạn đã đặt vé.
        </div>
        <button
          onClick={() => router.push('/customer/events')}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Về trang sự kiện
        </button>
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
              <span className="font-medium text-gray-900">#{orderData.orderNumber || orderData.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sự kiện:</span>
              <span className="font-medium text-gray-900">{orderData.eventName || orderData.event_name || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Họ tên:</span>
              <span className="font-medium text-gray-900">{orderData.customerName || orderData.customerFullName || orderData.customer_name || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-gray-900">{orderData.customerEmail || orderData.customer_email || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phương thức thanh toán:</span>
              <span className="font-medium text-gray-900">{orderData.paymentMethod || orderData.payment_method || '-'}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="font-medium mb-2">Chi tiết vé đã mua:</div>
              <div className="space-y-2">
                {orderData.orderItems && orderData.orderItems.length > 0 ? (
                  orderData.orderItems.map((item: any, idx: number) => (
                    <div key={item.id || idx} className="flex justify-between text-sm">
                      <span>
                        Loại vé: <b>{item.ticketTypeName || item.ticket_type_name}</b>
                      </span>
                      <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.subtotal)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">Không có vé nào</span>
                )}
              </div>
              <div className="flex justify-between font-bold mt-4">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(Number(orderData.totalAmount) || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleGoToOrders}
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