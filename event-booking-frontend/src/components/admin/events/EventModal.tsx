'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/common';
import { Event } from '@/types/event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Event) => void;
  event?: Event | null;
  mode: 'create' | 'edit';
}

export default function EventModal({
  isOpen,
  onClose,
  onSubmit,
  event,
  mode,
}: EventModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: event || {
      id: '',
      name: '',
      description: '',
      address: '',
      location: '',
      startDate: '',
      endDate: '',
      category: '',
      image: '',
      status: 'upcoming',
      organizer: {
        id: '',
        name: '',
        email: '',
        phone: ''
      },
      tickets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  });

  useEffect(() => {
    if (isOpen && event) {
      reset(event);
    }
  }, [isOpen, event, reset]);

  const onSubmitForm = (data: Event) => {
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
          {mode === 'create' ? 'Thêm sự kiện mới' : 'Chỉnh sửa sự kiện'}
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên sự kiện
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Vui lòng nhập tên sự kiện' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              rows={3}
              {...register('description', {
                required: 'Vui lòng nhập mô tả sự kiện',
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Địa điểm
              </label>
              <input
                type="text"
                id="address"
                {...register('address', { required: 'Vui lòng nhập địa điểm' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Thành phố
              </label>
              <input
                type="text"
                id="location"
                {...register('location', { required: 'Vui lòng nhập thành phố' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Thời gian bắt đầu
              </label>
              <input
                type="datetime-local"
                id="startDate"
                {...register('startDate', {
                  required: 'Vui lòng chọn thời gian bắt đầu',
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                Thời gian kết thúc
              </label>
              <input
                type="datetime-local"
                id="endDate"
                {...register('endDate', {
                  required: 'Vui lòng chọn thời gian kết thúc',
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="organizer.name"
                className="block text-sm font-medium text-gray-700"
              >
                Đơn vị tổ chức
              </label>
              <input
                type="text"
                id="organizer.name"
                {...register('organizer.name', {
                  required: 'Vui lòng nhập tên đơn vị tổ chức',
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.organizer?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organizer.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="organizer.email"
                className="block text-sm font-medium text-gray-700"
              >
                Email đơn vị tổ chức
              </label>
              <input
                type="email"
                id="organizer.email"
                {...register('organizer.email', {
                  required: 'Vui lòng nhập email đơn vị tổ chức',
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.organizer?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organizer.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="organizer.phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại đơn vị tổ chức
              </label>
              <input
                type="tel"
                id="organizer.phone"
                {...register('organizer.phone', {
                  required: 'Vui lòng nhập số điện thoại đơn vị tổ chức',
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.organizer?.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organizer.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Thể loại
              </label>
              <select
                id="category"
                {...register('category', { required: 'Vui lòng chọn thể loại' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Chọn thể loại</option>
                <option value="music">Âm nhạc</option>
                <option value="sports">Thể thao</option>
                <option value="arts">Nghệ thuật</option>
                <option value="food">Ẩm thực</option>
                <option value="technology">Công nghệ</option>
                <option value="business">Kinh doanh</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Giáo dục</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Trạng thái
              </label>
              <select
                id="status"
                {...register('status')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="upcoming">Sắp diễn ra</option>
                <option value="ongoing">Đang diễn ra</option>
                <option value="completed">Đã kết thúc</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Ảnh sự kiện (URL)
            </label>
            <input
              type="text"
              id="image"
              {...register('image', { required: 'Vui lòng nhập URL ảnh sự kiện' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
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
              {mode === 'create' ? 'Tạo sự kiện' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 