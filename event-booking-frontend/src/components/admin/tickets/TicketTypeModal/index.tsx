'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/common';
import { TicketType } from '@/types/ticket';

interface TicketTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TicketType) => void;
  ticketType?: TicketType | null;
  mode: 'create' | 'edit';
}

export function TicketTypeModal({
  isOpen,
  onClose,
  onSubmit,
  ticketType,
  mode,
}: TicketTypeModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketType>({
    defaultValues: ticketType || {
      id: '',
      eventId: '',
      eventName: '',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      sold: 0,
    },
  });

  useEffect(() => {
    if (isOpen && ticketType) {
      reset(ticketType);
    }
  }, [isOpen, ticketType, reset]);

  const onSubmitForm = (data: TicketType) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">
          {mode === 'create' ? 'Thêm loại vé mới' : 'Chỉnh sửa loại vé'}
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên loại vé
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Vui lòng nhập tên loại vé' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              id="description"
              rows={3}
              {...register('description')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Giá vé
              </label>
              <input
                type="number"
                id="price"
                {...register('price', { required: 'Vui lòng nhập giá vé', min: 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Số lượng
              </label>
              <input
                type="number"
                id="quantity"
                {...register('quantity', { required: 'Vui lòng nhập số lượng vé', min: 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {mode === 'create' ? 'Tạo loại vé' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 