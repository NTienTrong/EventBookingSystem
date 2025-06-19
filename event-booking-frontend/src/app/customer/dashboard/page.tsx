'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Ticket,
  ShoppingCart,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import api from '@/services/api/api';
import { Dialog } from '@headlessui/react';
import React from 'react';

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  remainingTickets: number;
  totalTickets: number;
  imageUrl: string;
  description: string;
  category: string;
}

interface Order {
  id: string;
  eventName: string;
  amount: number;
  status: 'COMPLETED' | 'pending' | 'cancelled';
  createdAt: string;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    upcomingEvents: 0,
    totalOrders: 0,
    totalSpent: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        if (!user?.id) return;
        // Lấy đơn hàng
        const ordersRes = await api.get(`/orders/customer/${user.id}`);
        const orders = ordersRes.data || [];
        // Lấy tổng số vé từ endpoint mới
        const totalTicketsRes = await api.get(`/orders/customer/${user.id}/total-tickets`);
        const totalTickets = totalTicketsRes.data || 0;
        // Lấy sự kiện sắp tới (chỉ lấy status UPCOMING)
        const eventsRes = await api.get(`/events?status=UPCOMING`);
        const userUpcomingEvents = eventsRes.data || [];
        // Thống kê
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum: number, o: any) => sum + (o.amount || 0), 0);
        // Đơn hàng gần đây (3 đơn mới nhất)
        const sortedOrders = [...orders].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const recentOrders = sortedOrders.slice(0, 3).map((o: any) => ({
          id: o.id,
          eventName: o.eventName,
          amount: o.amount,
          status: o.status,
          createdAt: o.createdAt,
        }));
        setUpcomingEvents(userUpcomingEvents);
        setRecentOrders(recentOrders);
        setStats({
          totalTickets,
          upcomingEvents: userUpcomingEvents.length,
          totalOrders,
          totalSpent,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [user]);

  const handleOpenEventModal = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };
  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Xin chào, {user?.fullName}!</h1>
        <p className="text-blue-100">Chào mừng bạn đến với EventNest. Đây là tổng quan về tài khoản của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng số vé</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTickets}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sự kiện sắp tới</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng chi tiêu</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalSpent)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Sự kiện sắp tới</h2>
            <Link href="/customer/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                onClick={(e: React.MouseEvent<any>) => { e.stopPropagation(); handleOpenEventModal(event); }}>
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-lg bg-gray-200 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{event.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(event.startTime), 'HH:mm, dd/MM/yyyy', { locale: vi })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.remainingTickets}/{event.totalTickets} vé
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e: React.MouseEvent<any>) => { e.stopPropagation(); handleOpenEventModal(event); }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Dialog open={showEventModal} onClose={handleCloseEventModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto z-10">
            {selectedEvent && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h2>
                  <Button variant="ghost" onClick={handleCloseEventModal}>Đóng</Button>
                </div>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.name} className="w-full h-64 object-cover rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      {format(new Date(selectedEvent.startTime), 'dd/MM/yyyy', { locale: vi })}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      {format(new Date(selectedEvent.startTime), 'HH:mm', { locale: vi })} - {format(new Date(selectedEvent.endTime), 'HH:mm', { locale: vi })}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      {selectedEvent.remainingTickets}/{selectedEvent.totalTickets} vé
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sự kiện</h3>
                    <p className="text-gray-600">{selectedEvent.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Thể loại: <span className="font-normal text-gray-700">{selectedEvent.category}</span></h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
            <Link href="/customer/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sự kiện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e: React.MouseEvent<any>) => { e.stopPropagation(); router.push(`/customer/orders/${order.id}`); }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
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