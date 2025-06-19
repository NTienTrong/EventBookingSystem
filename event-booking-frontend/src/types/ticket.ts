export interface TicketType {
  id?: number;
  name: string;
  description: string;
  price?: number;
  quantity: number;
  availableQuantity?: number;
  eventId: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  saleStartDate?: string;
  saleEndDate?: string;
}

export interface TicketFilter {
  search?: string;
  eventId?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  status?: 'ACTIVE' | 'USED' | 'CANCELLED';
}

export interface Ticket {
  id?: number;
  ticketCode: string;
  qrCode?: string;
  status: 'ACTIVE' | 'USED' | 'CANCELLED';
  issuedAt?: string;
  usedAt?: string;
  ticketTypeId?: number;
  ticketTypeName?: string;
  ticketTypePrice?: number;
  orderItemId?: number;
  eventId?: number;
  eventName?: string;
  eventLocation?: string;
  customerId?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  bookingId?: number;
} 