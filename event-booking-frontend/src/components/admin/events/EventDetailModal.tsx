'use client';

import { Modal } from '@/components/common';
import { Event } from '@/types/event';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/common';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onReload?: () => void;
}

export function EventDetailModal({ isOpen, onClose, event, onReload }: EventDetailModalProps) {
  if (!event) return null;

  const statusStyles: Record<Event['status'], string> = {
    upcoming: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<Event['status'], string> = {
    upcoming: 'Sắp diễn ra',
    ongoing: 'Đang diễn ra',
    completed: 'Đã kết thúc',
    cancelled: 'Đã hủy',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Chi tiết sự kiện</h2>
          <div className="flex items-center space-x-2">
            {onReload && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onReload}
                className="p-2"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hình ảnh sự kiện */}
          <div className="col-span-2">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
              <p className="text-sm text-gray-500">{event.category}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Mô tả</h4>
              <p className="mt-1 text-gray-600">{event.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Địa điểm</h4>
              <p className="mt-1 text-gray-600">{event.location}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Thời gian</h4>
              <p className="mt-1 text-gray-600">
                {new Date(event.startTime).toLocaleString('vi-VN')} - {new Date(event.endTime).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Trạng thái</h4>
              <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[event.status]}`}>
                {statusLabels[event.status]}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Sức chứa</h4>
              <p className="mt-1 text-gray-600">{event.capacity} người</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Giá vé</h4>
              <p className="mt-1 text-gray-600">{event.price.toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Vé đã bán</h4>
              <p className="mt-1 text-gray-600">
                {event.soldTickets}/{event.totalTickets} vé
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Doanh thu</h4>
              <p className="mt-1 text-gray-600">{(event.revenue ?? 0).toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Người tổ chức</h4>
              <p className="mt-1 text-gray-600">ID: {event.organizerId}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 