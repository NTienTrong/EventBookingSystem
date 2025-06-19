import api from './api';
import { Ticket, TicketType, TicketFilter } from '@/types/ticket';

export const ticketApi = {
  // Ticket Type APIs
  getAllTicketTypes: (params?: { search?: string; eventId?: number }) => {
    return api.get<TicketType[]>('/ticket-types', { params });
  },

  getTicketTypeById: (id: string) => {
    return api.get<TicketType>(`/ticket-types/${id}`);
  },

  createTicketType: (data: Partial<TicketType>) => {
    return api.post<TicketType>('/ticket-types', data);
  },

  updateTicketType: (id: string, data: Partial<TicketType>) => {
    return api.put<TicketType>(`/ticket-types/${id}`, data);
  },

  deleteTicketType: (id: string) => {
    return api.delete(`/ticket-types/${id}`);
  },

  // Ticket APIs
  getAllTickets: (params?: TicketFilter) => {
    return api.get<Ticket[]>('/tickets', { params });
  },

  getTicketById: (id: string) => {
    return api.get<Ticket>(`/tickets/${id}`);
  },

  getTicketByCode: (code: string) => {
    return api.get<Ticket>(`/tickets/code/${code}`);
  },

  getTicketsByEventId: (eventId: string) => {
    return api.get<Ticket[]>(`/tickets/event/${eventId}`);
  },

  getTicketsByOrderId: (orderId: string) => {
    return api.get<Ticket[]>(`/tickets/order/${orderId}`);
  },

  getTicketsByCustomerId: (customerId: string) => {
    return api.get<Ticket[]>(`/tickets/customer/${customerId}`);
  },

  createTicket: (data: Partial<Ticket>) => {
    return api.post<Ticket>('/tickets', data);
  },

  updateTicketStatus: (id: string, status: 'ACTIVE' | 'USED' | 'CANCELLED') => {
    return api.patch<Ticket>(`/tickets/${id}/status`, { status });
  },

  deleteTicket: (id: string) => {
    return api.delete(`/tickets/${id}`);
  },

  validateTicket: (ticketCode: string) => {
    return api.post<{ valid: boolean; message: string }>('/tickets/validate', { ticketCode });
  },
}; 