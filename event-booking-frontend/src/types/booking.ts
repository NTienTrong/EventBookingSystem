export interface BookingTicket {
  ticketTypeId: number;
  quantity: number;
}

export interface BookingRequest {
  eventId: number;
  tickets: BookingTicket[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  userId?: number;
  numberOfTickets: number;
  totalAmount: number;
  paymentMethod: string;
}

export interface BookingResponse {
  orderId: number;
  orderNumber: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  tickets: {
    id: number;
    ticketCode: string;
    qrCode: string;
    status: 'ACTIVE' | 'USED' | 'CANCELLED';
    ticketTypeName: string;
    price: number;
  }[];
} 