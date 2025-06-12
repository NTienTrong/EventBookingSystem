export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  category: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  tickets: Ticket[];
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
  status: 'available' | 'sold_out' | 'coming_soon';
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