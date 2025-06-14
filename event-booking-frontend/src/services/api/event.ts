import axios from 'axios';
import { Event } from '@/types/event';

const API_URL = 'http://localhost:8080/api/events';

export const eventApi = {
  getAllEvents: async (search?: string, status?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  },

  getEventById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createEvent: async (event: Event) => {
    const response = await axios.post(API_URL, event);
    return response.data;
  },

  updateEvent: async (id: number, event: Event) => {
    const response = await axios.put(`${API_URL}/${id}`, event);
    return response.data;
  },

  deleteEvent: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  getEventStatistics: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}/statistics`);
    return response.data;
  },

  getEventsByOrganizer: async (organizerId: number) => {
    const response = await axios.get(`${API_URL}/organizer/${organizerId}`);
    return response.data;
  },

  getEventsByCategory: async (category: string) => {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
  },

  getUpcomingEvents: async () => {
    const response = await axios.get(`${API_URL}/upcoming`);
    return response.data;
  },

  getEventsByLocation: async (location: string) => {
    const response = await axios.get(`${API_URL}/location/${location}`);
    return response.data;
  },

  searchEvents: async (keyword?: string, location?: string, category?: string) => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    const response = await axios.get(`${API_URL}/search?${params.toString()}`);
    return response.data;
  }
}; 