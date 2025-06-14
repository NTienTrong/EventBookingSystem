'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/common';
import { Event } from '@/types/event';
import { useAuth } from '@/contexts/AuthContext';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Event) => void;
  event?: Event | null;
  mode: 'create' | 'edit';
}

export function EventModal({ isOpen, onClose, onSubmit, event, mode }: EventModalProps) {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Event>();

  useEffect(() => {
    if (event) {
      reset(event);
    } else {
      reset({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        capacity: 0,
        price: 0,
        category: '',
        status: 'upcoming',
        organizerId: Number(user?.id) || 0,
        totalTickets: 0,
        soldTickets: 0,
        revenue: 0,
        imageUrl: ''
      });
    }
  }, [event, reset, user]);

  const onSubmitForm = (data: Event) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {mode === 'create' ? 'Thêm sự kiện mới' : 'Chỉnh sửa sự kiện'}
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên sự kiện</label>
          <input
            type="text"
            {...register('name', { required: 'Tên sự kiện là bắt buộc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea
            {...register('description', { required: 'Mô tả là bắt buộc' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian bắt đầu</label>
            <input
              type="datetime-local"
              {...register('startTime', { required: 'Thời gian bắt đầu là bắt buộc' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian kết thúc</label>
            <input
              type="datetime-local"
              {...register('endTime', { required: 'Thời gian kết thúc là bắt buộc' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
          <input
            type="text"
            {...register('location', { required: 'Địa điểm là bắt buộc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sức chứa</label>
            <input
              type="number"
              {...register('capacity', { required: 'Sức chứa là bắt buộc', min: 1 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Giá vé</label>
            <input
              type="number"
              {...register('price', { required: 'Giá vé là bắt buộc', min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tổng số vé</label>
            <input
              type="number"
              {...register('totalTickets', { required: 'Tổng số vé là bắt buộc', min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.totalTickets && <p className="mt-1 text-sm text-red-600">{errors.totalTickets.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số vé đã bán</label>
            <input
              type="number"
              {...register('soldTickets', { required: 'Số vé đã bán là bắt buộc', min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.soldTickets && <p className="mt-1 text-sm text-red-600">{errors.soldTickets.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thể loại</label>
          <input
            type="text"
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            {...register('status', { required: 'Trạng thái là bắt buộc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="upcoming">Sắp diễn ra</option>
            <option value="ongoing">Đang diễn ra</option>
            <option value="completed">Đã kết thúc</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL hình ảnh</label>
          <input
            type="text"
            {...register('imageUrl')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mode === 'create' ? 'Thêm sự kiện' : 'Cập nhật'}
          </button>
        </div>
      </form>
    </Modal>
  );
} 