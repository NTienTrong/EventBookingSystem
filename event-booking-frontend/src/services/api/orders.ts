import { Order, OrderFilter } from '@/types/order';
import api from './api';
export const ordersApi = {
  // Lấy danh sách đơn hàng
  getOrders: async (filter?: OrderFilter) => {
    const response = await api.get('/orders', { params: filter });
    return response.data;
  },

  // Lấy chi tiết đơn hàng
  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Tạo đơn hàng mới
  createOrder: async (data: {
    eventId: string;
    tickets: { ticketId: string; quantity: number }[];
    paymentMethod: Order['paymentMethod'];
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  // Cập nhật trạng thái đơn hàng (Admin)
  updateOrderStatus: async (id: string, status: Order['status']) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Hủy đơn hàng
  cancelOrder: async (id: string) => {
    const response = await api.post(`/orders/${id}/cancel`);
    return response.data;
  },

  // Thanh toán đơn hàng
  processPayment: async (id: string, paymentData: {
    method: Order['paymentMethod'];
    amount: number;
  }) => {
    const response = await api.post(`/orders/${id}/payment`, paymentData);
    return response.data;
  },
}; 