import api from './api';
import { Event } from '@/types/event';

export const eventApi = {
  getAllEvents: (params?: { search?: string; status?: string }) => {
    let query = '';
    if (params) {
      const q = [];
      if (params.search) q.push(`search=${encodeURIComponent(params.search)}`);
      if (params.status && params.status !== 'all') q.push(`status=${encodeURIComponent(params.status)}`);
      if (q.length > 0) query = '?' + q.join('&');
    }
    return api.get<Event[]>(`/events${query}`);
  },
  
  getEventById: (id: number) => api.get<Event>(`/events/${id}`),
  
  createEvent: (data: Partial<Event>) => api.post<Event>('/events', data),
  
  updateEvent: (id: number, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),
  
  deleteEvent: (id: number) => api.delete(`/events/${id}`),
  
  getEventsByOrganizer: (organizerId: number) => api.get<Event[]>(`/events/organizer/${organizerId}`),
  
  getEventsByCategory: (category: string) => api.get<Event[]>(`/events/category/${category}`),
  
  getEventsByLocation: (location: string) => api.get<Event[]>(`/events/location/${location}`),
  
  searchEvents: (keyword: string) => api.get<Event[]>(`/events/search?keyword=${keyword}`),
  
  getUpcomingEvents: () => api.get<Event[]>('/events/upcoming'),
  
  getPastEvents: () => api.get<Event[]>('/events/past'),
  
  getCurrentEvents: () => api.get<Event[]>('/events/current')
}; 