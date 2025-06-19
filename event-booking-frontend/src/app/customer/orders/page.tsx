'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Eye,
  Download,
  Calendar,
  CreditCard,
  Clock,
  MapPin,
  Users,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api/api';

interface Order {
  id: string;
  orderNumber: string;
  eventName: string;
  eventImage: string;
  ticketType: string;
  quantity: number;
  amount: number;
  status: 'COMPLETED' | 'pending' | 'cancelled';
  createdAt: string;
  eventDate: string;
  eventLocation: string;
  paymentMethod: string;
}

const PAGE_SIZE = 10;

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' });
  const [reloading, setReloading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.id) return;
        const response = await api.get(`/orders/customer/${String(user.id)}`);
        console.log('Orders data:', response.data);
        const sortedOrders = response.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    let result = [...orders];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(order =>
        order.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(order => order.status === selectedStatus);
    }

    // Filter by payment status
    if (selectedPaymentStatus !== 'all') {
      result = result.filter(order => order.paymentStatus === selectedPaymentStatus);
    }

    // Filter by date range
    if (dateRange.from) {
      result = result.filter(order => new Date(order.createdAt) >= new Date(dateRange.from));
    }
    if (dateRange.to) {
      result = result.filter(order => new Date(order.createdAt) <= new Date(dateRange.to));
    }

    setFilteredOrders(result);
  }, [searchQuery, selectedStatus, selectedPaymentStatus, dateRange, orders]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedPaymentStatus, dateRange, orders]);

  const handleDownloadTicket = (orderId: string) => {
    // TODO: Implement ticket download
    console.log('Downloading ticket for order:', orderId);
  };

  const handleReload = async () => {
    setReloading(true);
    try {
      if (!user?.id) return;
      const response = await api.get(`/orders/customer/${String(user.id)}`);
      const sortedOrders = response.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      console.error('Error reloading:', error);
    } finally {
      setReloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-8 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">Lịch sử mua hàng</h1>
            <p className="text-lg mt-2 font-medium opacity-90">Xem lại toàn bộ đơn hàng, trạng thái thanh toán và chi tiết vé bạn đã đặt.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-900"
              />
            </div>
            <select value={selectedPaymentStatus} onChange={e => setSelectedPaymentStatus(e.target.value)} className="border rounded px-2 py-1 text-gray-900">
              <option value="all">Tất cả thanh toán</option>
              <option value="COMPLETED">Đã thanh toán</option>
              <option value="PENDING">Chờ thanh toán</option>
              <option value="REFUNDED">Đã hoàn tiền</option>
            </select>
            <Button
              variant="outline"
              onClick={handleReload}
              disabled={reloading}
              className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-blue-600 transition"
            >
              <RefreshCw className={`h-4 w-4 ${reloading ? 'animate-spin' : ''}`} />
              Tải lại
            </Button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Mã đơn hàng</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sự kiện</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Loại vé</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Số lượng</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày đặt</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">#{order.orderNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                          src={order.eventImage}
                          alt={order.eventName}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{order.eventName}</div>
                        <div className="text-xs text-gray-500">{order.eventDate ? format(new Date(order.eventDate), 'dd/MM/yyyy', { locale: vi }) : 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.ticketType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.createdAt ? format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi }) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/customer/orders/${order.id}`)}
                        className="hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4 mr-2 text-blue-600" />
                      </Button>
                      {order.status === 'COMPLETED' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTicket(order.id)}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Tải vé
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center py-6 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3"
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3"
            >
              &gt;
            </Button>
          </div>
        )}
      </div>

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <img src="/images/empty-orders.svg" alt="No orders" className="w-40 h-40 mb-6 opacity-80" />
          <p className="text-lg text-gray-500 font-medium">Bạn chưa có đơn hàng nào. Hãy đặt vé để trải nghiệm sự kiện tuyệt vời!</p>
        </div>
      )}
    </div>
  );
} 