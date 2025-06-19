'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';

interface EventFormProps {
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  event?: Event | null;
  mode: 'create' | 'edit';
}

const defaultFormData: Event = {
  id: 0,
  name: '',
  description: '',
  startTime: '',
  endTime: '',
  location: '',
  capacity: 0,
  imageUrl: '',
  category: '',
  status: 'DRAFT',
  organizerId: 0,
  totalTickets: 0,
  soldTickets: 0,
  createdAt: '',
  updatedAt: ''
};

export function EventForm({ onSubmit, onCancel, event, mode }: EventFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Event>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        ...defaultFormData,
        organizerId: user?.id ? Number(user.id) : 0
      });
    }
  }, [event, user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên sự kiện';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Vui lòng chọn thời gian bắt đầu';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'Vui lòng chọn thời gian kết thúc';
    }
    
    if (formData.startTime && formData.endTime && new Date(formData.startTime) >= new Date(formData.endTime)) {
      newErrors.endTime = 'Thời gian kết thúc phải sau thời gian bắt đầu';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Vui lòng nhập địa điểm';
    }
    
    if (formData.capacity <= 0) {
      newErrors.capacity = 'Sức chứa phải lớn hơn 0';
    }
    
    if (formData.totalTickets < 0) {
      newErrors.totalTickets = 'Tổng số vé không được âm';
    }
    
    if (formData.soldTickets < 0) {
      newErrors.soldTickets = 'Số vé đã bán không được âm';
    }
    
    if (formData.soldTickets > formData.totalTickets) {
      newErrors.soldTickets = 'Số vé đã bán không được lớn hơn tổng số vé';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['capacity', 'totalTickets', 'soldTickets'].includes(name) 
        ? Number(value) 
        : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tên sự kiện */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Tên sự kiện</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Mô tả */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Thời gian bắt đầu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Thời gian bắt đầu</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.startTime ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
        </div>

        {/* Thời gian kết thúc */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Thời gian kết thúc</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.endTime ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
        </div>

        {/* Địa điểm */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.location ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Sức chứa */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sức chứa</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.capacity ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>

        {/* URL hình ảnh */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">URL hình ảnh</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Danh mục</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="UPCOMING">Sắp diễn ra</option>
            <option value="ONGOING">Đang diễn ra</option>
            <option value="COMPLETED">Đã kết thúc</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>

        {/* Tổng số vé */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tổng số vé</label>
          <input
            type="text"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            min="0"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.totalTickets ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.totalTickets && <p className="mt-1 text-sm text-red-600">{errors.totalTickets}</p>}
        </div>

        {/* Số vé đã bán */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Số vé đã bán</label>
          <input
            type="text"
            name="soldTickets"
            value={formData.soldTickets}
            onChange={handleChange}
            min="0"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.soldTickets ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.soldTickets && <p className="mt-1 text-sm text-red-600">{errors.soldTickets}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {mode === 'create' ? 'Thêm sự kiện' : 'Cập nhật'}
        </Button>
      </div>
    </form>
  );
} 