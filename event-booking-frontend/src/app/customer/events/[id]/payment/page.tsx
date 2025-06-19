'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { orderApi } from '@/api/booking';
import { OrderRequest } from '@/types/order';
import Image from 'next/image';
import { eventApi } from '@/services/api/event';
import { orderApi as orderApiService } from '@/services/api/order';
import { PaymentStatus, OrderStatus } from '@/types/enums';

export default function PaymentPage({ params }: { params: any }) {
  const { id } = React.use(params) as { id: string };
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderRequest | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('orderData');
    if (!data) {
      router.push(`/customer/events/${id}/booking`);
      return;
    }
    const parsed = JSON.parse(data);
    console.log('OrderData từ localStorage:', parsed);
    setOrderData(parsed);
  }, [id, router]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await eventApi.getEventById(Number(id));
        setEvent(eventData.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async () => {
    if (!orderData) return;

    try {
      setSaving(true);
      setError(null);
      if (!orderData.customerId) {
        setError('Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.');
        return;
      }
      const response = await orderApiService.createOrder(orderData);
      const orderId = response.id;
      await orderApiService.updatePaymentStatus(orderId, PaymentStatus.COMPLETED);
      await orderApiService.updateOrderStatus(orderId, OrderStatus.CONFIRMED);
      console.log('Order created:', response);
      localStorage.removeItem('orderData');
      localStorage.setItem('currentOrder', JSON.stringify(response));
      router.push(`/customer/events/${id}/payment/success`);
    } catch (error: any) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status:', error.response.status);
        setError(error.response.data?.message || `Lỗi: ${error.response.status}`);
      } else if (error.request) {
        setError('Không nhận được phản hồi từ server');
      } else {
        setError('Có lỗi xảy ra khi gửi request');
      }
    } finally {
      setSaving(false);
    }
  };

  if (!orderData || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin sự kiện</h2>
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={event.imageUrl || '/images/event-default.jpg'}
                    alt={event.name}
                    className="object-cover rounded-lg w-24 h-24"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Số lượng vé</p>
                      <p className="font-medium">
                        {orderData.tickets.reduce((sum, t) => sum + t.quantity, 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tổng tiền</p>
                      <p className="font-medium text-blue-600">
                        {orderData.totalAmount.toLocaleString('vi-VN')} VNĐ
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Chọn ngân hàng thanh toán
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={orderData.paymentMethod}
                    onChange={(e) => setOrderData(prev => prev ? {...prev, paymentMethod: e.target.value as 'MB' | 'PV'} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="MB">Ngân hàng MB Bank</option>
                    <option value="PV">Ngân hàng PVConnect</option>
                  </select>
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Đang xử lý...' : 'Thanh toán'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push(`/customer/events/${id}/booking`)}
                    className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin người đặt</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Họ tên</p>
                  <p className="font-medium">{orderData.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{orderData.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{orderData.customerPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 