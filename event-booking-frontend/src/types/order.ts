export interface Order {
  id: string;
  userId: string;
  eventId: string;
  event: {
    id: string;
    name: string;
    startDate: string;
    location: string;
  };
  tickets: OrderTicket[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'momo' | 'zalopay';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface OrderTicket {
  id: string;
  ticketId: string;
  ticketName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderFilter {
  userId?: string;
  eventId?: string;
  status?: Order['status'];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
} 