import { Ticket, TicketType } from '@/types/ticket';
import { api } from './api';

export const ticketApi = {
  // Ticket Types
  getAllTicketTypes: async (): Promise<TicketType[]> => {
    try {
      const response = await api.get('/api/ticket-types');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách loại vé:', error);
      throw error;
    }
  },

  createTicketType: async (data: Partial<TicketType>): Promise<TicketType> => {
    try {
      const response = await api.post('/api/ticket-types', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo loại vé:', error);
      throw error;
    }
  },

  updateTicketType: async (id: number, data: Partial<TicketType>): Promise<TicketType> => {
    try {
      const response = await api.put(`/api/ticket-types/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật loại vé:', error);
      throw error;
    }
  },

  deleteTicketType: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/ticket-types/${id}`);
    } catch (error) {
      console.error('Lỗi khi xóa loại vé:', error);
      throw error;
    }
  },

  // Tickets
  getAllTickets: async (): Promise<Ticket[]> => {
    try {
      const response = await api.get('/api/tickets');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vé:', error);
      throw error;
    }
  },

  getTicketById: async (id: number): Promise<Ticket> => {
    try {
      const response = await api.get(`/api/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin vé:', error);
      throw error;
    }
  },

  createTicket: async (data: Partial<Ticket>): Promise<Ticket> => {
    try {
      const response = await api.post('/api/tickets', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo vé:', error);
      throw error;
    }
  },

  updateTicket: async (id: number, data: Partial<Ticket>): Promise<Ticket> => {
    try {
      const response = await api.put(`/api/tickets/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật vé:', error);
      throw error;
    }
  },

  deleteTicket: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/tickets/${id}`);
    } catch (error) {
      console.error('Lỗi khi xóa vé:', error);
      throw error;
    }
  },

  updateTicketStatus: async (id: number, status: Ticket['status']): Promise<Ticket> => {
    try {
      const response = await api.put(`/api/tickets/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái vé:', error);
      throw error;
    }
  },

  getTicketsByEventId: async (eventId: number) => {
    const response = await api.get(`/tickets/event/${eventId}`);
    return response.data;
  },

  getTicketsByUserId: async (userId: number) => {
    const response = await api.get(`/tickets/user/${userId}`);
    return response.data;
  },

  validateTicket: async (ticketCode: string) => {
    const response = await api.post('/tickets/validate', { ticketCode });
    return response.data;
  }
}; 