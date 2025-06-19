'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ordersApi } from '@/services/api/orders';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentStatus } from '@/types/enums';

interface OrderItem {
  id: string;
  ticketTypeName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  eventName: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  paymentMethod: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  orderItems: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!params.id) return;
        const order = await ordersApi.getOrderById(params.id);
        setOrder(order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params.id]);

  const handleDownloadTicket = (ticketId: string) => {
    // TODO: Implement ticket download
    console.log('Downloading ticket:', ticketId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy thông tin đơn hàng.</p>
      </div>
    );
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'PENDING':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'REFUNDED':
        return <XCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Order Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Đơn hàng #{order.id}</h1>
            <p className="text-gray-500">
              Đặt lúc {format(new Date(order.createdAt), 'HH:mm, dd/MM/yyyy', { locale: vi })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getPaymentStatusIcon(order.paymentStatus)}
            <span className={`text-sm font-medium
              ${order.paymentStatus === 'COMPLETED' ? 'text-green-600' :
                order.paymentStatus === 'PENDING' ? 'text-yellow-600' :
                order.paymentStatus === 'REFUNDED' ? 'text-blue-600' :
                'text-red-600'}`}>
              {order.paymentStatus === 'COMPLETED' ? 'Đã thanh toán' :
                order.paymentStatus === 'PENDING' ? 'Chờ thanh toán' :
                order.paymentStatus === 'REFUNDED' ? 'Đã hoàn tiền' :
                'Thanh toán thất bại'}
            </span>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <img
                src={order.eventImage}
                alt={order.eventName}
                className="h-32 w-32 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{order.eventName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    {format(new Date(order.eventDate), 'dd/MM/yyyy', { locale: vi })}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    {format(new Date(order.eventDate), 'HH:mm', { locale: vi })}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {order.eventLocation}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    {order.quantity} vé
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-5 w-5 mr-2" />
                    {order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin đơn hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin khách hàng</h3>
            <div className="space-y-2">
              <p className="text-gray-900">
                <span className="font-medium">Họ tên:</span> {order.customerFullName}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Điện thoại:</span> {order.customerPhone}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin thanh toán</h3>
            <div className="space-y-2">
              <p className="text-gray-900">
                <span className="font-medium">Phương thức:</span> {order.paymentMethod}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Ngày đặt:</span> {order.createdAt ? format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi }) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        {/* Danh sách vé trong đơn hàng */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chi tiết vé</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên vé</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa điểm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.orderItems.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.ticketTypeName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.eventName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.eventDate ? format(new Date(item.eventDate), 'dd/MM/yyyy', { locale: vi }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.eventLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 