export interface Event {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  imageUrl?: string;
  category?: string;
  status: 'DRAFT' | 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  organizerId: number;
  totalTickets: number;
  soldTickets: number;
  createdAt: string;
  updatedAt: string;
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

export interface EventDTO {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  capacity: number;
  availableTickets: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  category: string;
  organizer: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  };
  ticketTypes: TicketTypeDTO[];
}

export interface TicketTypeDTO {
  id?: number;
  eventId: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  availableQuantity?: number;
  active: boolean;
  saleStartDate?: string;
  saleEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
} 