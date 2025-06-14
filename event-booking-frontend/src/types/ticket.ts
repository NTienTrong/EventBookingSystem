export interface TicketType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  eventId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TicketFilter {
  search?: string;
  eventId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface Ticket {
  id: number;
  ticketCode: string;
  qrCode: string;
  status: 'ACTIVE' | 'USED' | 'CANCELLED';
  issuedAt: string;
  usedAt?: string;
  orderItemId: number;
  event?: {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
  };
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
} 