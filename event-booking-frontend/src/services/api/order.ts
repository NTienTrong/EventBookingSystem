import api from './api';
import { Order, OrderFilter } from '@/types/order';

export const orderApi = {
  getAllOrders: async (filter?: OrderFilter): Promise<Order[]> => {
    try {
      const response = await api.get('/orders', { params: filter });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  },

  getAllOrdersWithPagination: async (page: number = 0, size: number = 10): Promise<{ content: Order[], totalElements: number, totalPages: number }> => {
    try {
      const response = await api.get('/orders/page', {
        params: {
          page,
          size,
          sortBy: 'createdAt',
          direction: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  },

  getOrderById: async (id: number): Promise<Order> => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      throw error;
    }
  },

  getOrdersByEventId: async (eventId: number): Promise<Order[]> => {
    try {
      const response = await api.get(`/orders/event/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng của sự kiện:', error);
      throw error;
    }
  },

  getOrdersByCustomerId: async (customerId: number): Promise<Order[]> => {
    try {
      const response = await api.get(`/orders/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng của khách hàng:', error);
      throw error;
    }
  },

  createOrder: async (data: Partial<Order>): Promise<Order> => {
    try {
      const response = await api.post('/orders', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id: number, status: Order['status']): Promise<Order> => {
    try {
      const response = await api.put(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  },

  updatePaymentStatus: async (id: number, paymentStatus: Order['paymentStatus']): Promise<Order> => {
    try {
      const response = await api.put(`/orders/${id}/payment-status`, { paymentStatus });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
      throw error;
    }
  },

  cancelOrder: async (id: number): Promise<Order> => {
    try {
      const response = await api.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      throw error;
    }
  },

  refundOrder: async (id: number): Promise<Order> => {
    try {
      const response = await api.put(`/orders/${id}/refund`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi hoàn tiền đơn hàng:', error);
      throw error;
    }
  },

  searchOrders: async (
    search?: string,
    status?: string,
    paymentStatus?: string,
    startDate?: string,
    endDate?: string,
    page: number = 0,
    size: number = 10
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy: 'createdAt',
        direction: 'desc'
      });

      if (search) params.append('search', search);
      if (status) params.append('status', status);
      if (paymentStatus) params.append('paymentStatus', paymentStatus);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await api.get(`/orders/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching orders:', error);
      throw error;
    }
  }
}; 