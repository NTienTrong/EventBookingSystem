'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/common';
import { TicketType } from '@/types/ticket';

interface TicketTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<TicketType>) => void;
  ticketType?: TicketType;
  mode: 'create' | 'edit';
}

export default function TicketTypeModal({ isOpen, onClose, onSubmit, ticketType, mode }: TicketTypeModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<TicketType>>();

  useEffect(() => {
    if (isOpen) {
      if (ticketType) {
        reset(ticketType);
      } else {
        reset({
          name: '',
          description: '',
          price: 0,
          quantity: 0
        });
      }
    }
  }, [isOpen, ticketType, reset]);

  const onSubmitForm = (data: Partial<TicketType>) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {mode === 'create' ? 'Tạo loại vé mới' : 'Chỉnh sửa loại vé'}
        </h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên loại vé
            </label>
            <input
              type="text"
              {...register('name', { required: 'Vui lòng nhập tên loại vé' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá vé
              </label>
              <input
                type="number"
                {...register('price', { 
                  required: 'Vui lòng nhập giá vé',
                  min: { value: 0, message: 'Giá vé phải lớn hơn 0' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số lượng
              </label>
              <input
                type="number"
                {...register('quantity', { 
                  required: 'Vui lòng nhập số lượng',
                  min: { value: 1, message: 'Số lượng phải lớn hơn 0' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
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
              {mode === 'create' ? 'Tạo loại vé' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 