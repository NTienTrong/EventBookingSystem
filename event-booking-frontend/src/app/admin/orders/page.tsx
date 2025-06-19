'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order } from '@/types/order';
import { OrderStatus, PaymentStatus } from '@/types/enums';
import { Button, Card } from '@/components/common';
import OrderDetailModal from '@/components/admin/orders/OrderDetailModal';
import { orderApi } from '@/services/api/order';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, [currentPage, filterStatus, searchQuery]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.searchOrders(
        searchQuery,
        filterStatus !== 'all' ? filterStatus : undefined,
        undefined,
        undefined,
        undefined,
        currentPage,
        pageSize
      );
      setOrders(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Lỗi khi tải danh sách đơn hàng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, status: OrderStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, status);
      toast.success('Cập nhật trạng thái thành công');
      loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const handlePaymentStatusChange = async (orderId: number, status: PaymentStatus) => {
    try {
      await orderApi.updatePaymentStatus(orderId, status);
      toast.success('Cập nhật trạng thái thanh toán thành công');
      loadOrders();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Lỗi khi cập nhật trạng thái thanh toán');
    }
  };

  const handleCancel = async (orderId: number) => {
    try {
      await orderApi.cancelOrder(orderId);
      toast.success('Hủy đơn hàng thành công');
      loadOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Lỗi khi hủy đơn hàng');
    }
  };

  const handleRefund = async (orderId: number) => {
    try {
      await orderApi.refundOrder(orderId);
      toast.success('Hoàn tiền thành công');
      loadOrders();
    } catch (error) {
      console.error('Error refunding order:', error);
      toast.error('Lỗi khi hoàn tiền');
    }
  };

  const handleReload = async () => {
    await loadOrders();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Quản lý đơn hàng
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            disabled={isLoading}
            className="p-2"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value as OrderStatus | 'all'); setCurrentPage(0); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value={OrderStatus.PENDING}>Chờ xác nhận</option>
              <option value={OrderStatus.CONFIRMED}>Đã xác nhận</option>
              <option value={OrderStatus.COMPLETED}>Hoàn thành</option>
              <option value={OrderStatus.CANCELLED}>Đã hủy</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(order.totalAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        {
                          [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
                          [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
                          [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
                          [OrderStatus.REFUNDED]: 'bg-gray-100 text-gray-800',
                          [OrderStatus.COMPLETED]: 'bg-green-100 text-green-800'
                        }[order.status]
                      }`}
                    >
                      {
                        {
                          [OrderStatus.PENDING]: 'Chờ xác nhận',
                          [OrderStatus.CONFIRMED]: 'Đã xác nhận',
                          [OrderStatus.CANCELLED]: 'Đã hủy',
                          [OrderStatus.REFUNDED]: 'Đã hoàn tiền',
                          [OrderStatus.COMPLETED]: 'Hoàn thành'
                        }[order.status]
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: vi })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'HH:mm', { locale: vi })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{orders.length}</span> trong tổng số{' '}
              <span className="font-medium">{totalElements}</span> đơn hàng
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-700">
              Trang {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1 || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
        onCancel={handleCancel}
        onRefund={handleRefund}
      />
    </div>
  );
} 