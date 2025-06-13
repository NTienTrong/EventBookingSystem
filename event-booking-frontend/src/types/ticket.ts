export interface TicketType {
  id: string;
  eventId: string;
  eventName: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  benefits?: string[];
}

export interface TicketFilter {
  search?: string;
  eventId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
} 