import { Event, EventFilter } from '@/types/event';
import axios from 'axios';
import { api } from './api';

export const eventsApi = {
  // Lấy danh sách sự kiện
  getEvents: async (filter?: EventFilter) => {
    const response = await api.get('/events', { params: filter });
    return response.data;
  },

  // Lấy chi tiết sự kiện
  getEventById: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Tạo sự kiện mới (Admin)
  createEvent: async (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/events', data);
    return response.data;
  },

  // Cập nhật sự kiện (Admin)
  updateEvent: async (id: string, data: Partial<Event>) => {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  // Xóa sự kiện (Admin)
  deleteEvent: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  // Lấy danh mục sự kiện
  getCategories: async () => {
    const response = await api.get('/events/categories');
    return response.data;
  },
}; 