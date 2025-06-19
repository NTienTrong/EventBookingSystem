import { ReportDTO } from '../../types/report';
import api from './api';

export const reportApi = {
  // Báo cáo doanh thu
  getRevenueReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/revenue', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue report:', error);
      throw error;
    }
  },

  // Báo cáo loại vé
  getTicketTypeReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/ticket-types', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket type report:', error);
      throw error;
    }
  },

  // Báo cáo doanh thu theo loại vé
  getTicketTypeRevenueReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/ticket-type-revenue', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket type revenue report:', error);
      throw error;
    }
  },

  // Báo cáo tổng quan
  getSummaryReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/summary', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching summary report:', error);
      throw error;
    }
  },

  // Báo cáo hoạt động người dùng
  getUserActivityReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/user-activity', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user activity report:', error);
      throw error;
    }
  },

  // Báo cáo lịch sử vé người dùng
  getUserTicketHistoryReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/user-ticket-history', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user ticket history report:', error);
      throw error;
    }
  },

  // Báo cáo lịch sử sự kiện người dùng
  getUserEventHistoryReport: async (startDate?: Date, endDate?: Date): Promise<ReportDTO> => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.get('/admin/reports/user-event-history', {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user event history report:', error);
      throw error;
    }
  }
}; 