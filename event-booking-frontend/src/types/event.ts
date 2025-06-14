export interface Event {
  id?: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
  category?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizerId: number;
  totalTickets?: number;
  soldTickets?: number;
  revenue?: number;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  status: 'available' | 'sold_out' | 'cancelled';
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventFilter {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: Event['status'];
  page?: number;
  limit?: number;
} 