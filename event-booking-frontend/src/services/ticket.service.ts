import axios from 'axios';
import { Ticket, TicketType } from '@/types/ticket';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const ticketService = {
  // Ticket Type APIs
  async getTicketTypes(eventId?: string) {
    const url = eventId ? `${API_URL}/ticket-types/event/${eventId}` : `${API_URL}/ticket-types`;
    const response = await axios.get(url);
    return response.data;
  },

  async getTicketTypeById(id: string) {
    const response = await axios.get(`${API_URL}/ticket-types/${id}`);
    return response.data;
  },

  async createTicketType(ticketType: Partial<TicketType>) {
    const response = await axios.post(`${API_URL}/ticket-types`, ticketType);
    return response.data;
  },

  async updateTicketType(id: string, ticketType: Partial<TicketType>) {
    const response = await axios.put(`${API_URL}/ticket-types/${id}`, ticketType);
    return response.data;
  },

  async deleteTicketType(id: string) {
    await axios.delete(`${API_URL}/ticket-types/${id}`);
  },

  // Ticket APIs
  async getTickets(eventId?: string) {
    const url = eventId ? `${API_URL}/tickets/event/${eventId}` : `${API_URL}/tickets`;
    const response = await axios.get(url);
    return response.data;
  },

  async getTicketById(id: string) {
    const response = await axios.get(`${API_URL}/tickets/${id}`);
    return response.data;
  },

  async updateTicketStatus(id: string, status: 'ACTIVE' | 'USED' | 'CANCELLED') {
    const response = await axios.put(`${API_URL}/tickets/${id}/status`, { status });
    return response.data;
  },

  async validateTicket(ticketCode: string) {
    const response = await axios.post(`${API_URL}/tickets/validate`, { ticketCode });
    return response.data;
  }
}; 