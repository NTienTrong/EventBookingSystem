import { TicketType } from './ticket';
import { OrderStatus, PaymentStatus } from './enums';

export interface OrderTicket {
  ticketTypeId: number;
  quantity: number;
}

export interface OrderRequest {
  eventId: number;
  tickets: OrderTicket[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerId: number;
  totalAmount: number;
  paymentMethod: string;
}

export interface OrderItem {
  id: number;
  ticketTypeId: number;
  ticketTypeName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  notes?: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse extends Order {}

export interface OrderFilter {
  search?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
} 