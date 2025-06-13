export interface OrderTicket {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderFilter {
  search?: string;
  eventId?: string;
  status?: Order['status'];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
} 