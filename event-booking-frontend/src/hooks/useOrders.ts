import { useState } from 'react';
import { Order, OrderFilter } from '@/types/order';
import { ordersApi } from '@/services/api/orders';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrders = async (filter?: OrderFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.getOrders(filter);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.getOrderById(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (data: {
    eventId: string;
    tickets: { ticketId: string; quantity: number }[];
    paymentMethod: Order['paymentMethod'];
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.createOrder(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.updateOrderStatus(id, status);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.cancelOrder(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (id: string, paymentData: {
    method: Order['paymentMethod'];
    amount: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.processPayment(id, paymentData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    processPayment,
  };
}; 