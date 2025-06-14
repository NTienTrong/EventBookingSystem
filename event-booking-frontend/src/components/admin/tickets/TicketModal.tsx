import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/common';
import { Ticket } from '@/types/ticket';
import { eventApi } from '@/services/api/event';
import { Event } from '@/types/event';
import { generateTicketCode } from '@/utils/ticket';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Ticket>) => void;
  ticket?: Ticket;
  mode: 'create' | 'edit';
}

export default function TicketModal({ isOpen, onClose, onSubmit, ticket, mode }: TicketModalProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Ticket>>();

  useEffect(() => {
    if (isOpen) {
      loadEvents();
      if (ticket) {
        reset(ticket);
      } else {
        reset({
          ticketCode: generateTicketCode(),
          qrCode: generateTicketCode(),
          status: 'ACTIVE'
        });
      }
    }
  }, [isOpen, ticket, reset]);

  const loadEvents = async () => {
    try {
      const data = await eventApi.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const onSubmitForm = (data: Partial<Ticket>) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {mode === 'create' ? 'Tạo vé mới' : 'Chỉnh sửa vé'}
        </h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã vé
              </label>
              <input
                type="text"
                {...register('ticketCode', { required: 'Vui lòng nhập mã vé' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
              {errors.ticketCode && (
                <p className="mt-1 text-sm text-red-600">{errors.ticketCode.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã QR
              </label>
              <input
                type="text"
                {...register('qrCode', { required: 'Vui lòng nhập mã QR' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
              {errors.qrCode && (
                <p className="mt-1 text-sm text-red-600">{errors.qrCode.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                {...register('status', { required: 'Vui lòng chọn trạng thái' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ACTIVE">Còn hiệu lực</option>
                <option value="USED">Đã sử dụng</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Tạo vé' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 