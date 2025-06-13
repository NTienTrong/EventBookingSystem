'use client';

import { Modal, Button } from '@/components/common';
import { Order } from '@/types/order';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
  if (!order) return null;

  const statusOptions = [
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">Chi tiết đơn hàng</h2>
        {/* Order Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Mã đơn hàng</h3>
            <p className="mt-1 text-sm text-gray-900">#{order.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Ngày đặt</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Tổng tiền</h3>
            <p className="mt-1 text-sm text-gray-900">
              {order.totalAmount.toLocaleString('vi-VN')} VNĐ
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Thông tin khách hàng
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.customerName}
                </p>
                <p className="text-sm text-gray-500">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{order.customerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Thông tin sự kiện
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.eventName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.eventDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{order.eventLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Chi tiết vé
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase">
                    Loại vé
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase">
                    Số lượng
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.tickets.map((ticket, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {ticket.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {ticket.price.toLocaleString('vi-VN')} VNĐ
                      </p>
                    </td>
                    <td className="py-2 text-center text-sm text-gray-500">
                      {ticket.quantity}
                    </td>
                    <td className="py-2 text-right text-sm text-gray-900">
                      {(ticket.price * ticket.quantity).toLocaleString('vi-VN')}{' '}
                      VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="pt-4 text-right font-medium">
                    Tổng cộng:
                  </td>
                  <td className="pt-4 text-right text-sm font-medium text-gray-900">
                    {order.totalAmount.toLocaleString('vi-VN')} VNĐ
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
} 