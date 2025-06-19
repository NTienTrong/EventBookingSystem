import api from './api';
import { OrderRequest, OrderResponse } from '@/types/order';

export const orderApi = {
  createOrder: (data: OrderRequest) => {
    return api.post<OrderResponse>('/orders', data);
  },

  getOrderById: (id: string) => {
    return api.get<OrderResponse>(`/orders/${id}`);
  },

  getOrderByOrderNumber: (orderNumber: string) => {
    return api.get<OrderResponse>(`/orders/order/${orderNumber}`);
  },

  getAllOrders: () => {
    return api.get<OrderResponse[]>('/orders');
  },

  getCustomerOrders: (customerId: string) => {
    return api.get<OrderResponse[]>(`/orders/customer/${customerId}`);
  }
}; 