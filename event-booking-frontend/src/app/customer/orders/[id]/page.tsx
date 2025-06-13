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

interface Order {
  id: string;
  eventName: string;
  eventImage: string;
  ticketType: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  eventDate: string;
  eventLocation: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tickets: {
    id: string;
    code: string;
    status: 'active' | 'used' | 'cancelled';
  }[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated data
        const fakeOrder: Order = {
          id: params.id,
          eventName: 'Hội thảo Công nghệ 2024',
          eventImage: '/images/event1.jpg',
          ticketType: 'Vé thường',
          quantity: 2,
          amount: 1000000,
          status: 'completed',
          createdAt: '2024-03-10T10:00:00',
          eventDate: '2024-03-15T09:00:00',
          eventLocation: 'Hà Nội',
          paymentMethod: 'VNPay',
          paymentStatus: 'completed',
          customerName: 'Nguyễn Văn A',
          customerEmail: 'nguyenvana@example.com',
          customerPhone: '0123456789',
          tickets: [
            {
              id: '1',
              code: 'EVENT-2024-001',
              status: 'active',
            },
            {
              id: '2',
              code: 'EVENT-2024-002',
              status: 'active',
            },
          ],
        };

        setOrder(fakeOrder);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
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
            {getStatusIcon(order.status)}
            <span className={`text-sm font-medium
              ${order.status === 'completed' ? 'text-green-600' :
                order.status === 'pending' ? 'text-yellow-600' :
                'text-red-600'}`}>
              {order.status === 'completed' ? 'Hoàn thành' :
                order.status === 'pending' ? 'Đang xử lý' :
                'Đã hủy'}
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
                <span className="font-medium">Họ tên:</span> {order.customerName}
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
                <span className="font-medium">Trạng thái:</span>{' '}
                <span className={`inline-flex items-center
                  ${order.paymentStatus === 'completed' ? 'text-green-600' :
                    order.paymentStatus === 'pending' ? 'text-yellow-600' :
                    'text-red-600'}`}>
                  {order.paymentStatus === 'completed' ? 'Đã thanh toán' :
                    order.paymentStatus === 'pending' ? 'Đang xử lý' :
                    'Thất bại'}
                </span>
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Tổng tiền:</span>{' '}
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Danh sách vé</h2>
        <div className="space-y-4">
          {order.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{ticket.code}</p>
                <p className="text-sm text-gray-500">
                  {ticket.status === 'active' ? 'Chưa sử dụng' :
                    ticket.status === 'used' ? 'Đã sử dụng' :
                    'Đã hủy'}
                </p>
              </div>
              {ticket.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadTicket(ticket.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải vé
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 