'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common';
import { Button } from '@/components/common';
import { RefreshCw, Download } from 'lucide-react';
import { reportApi } from '@/services/api/report';
import { ReportDTO } from '@/types/report';
import toast from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportDTO | null>(null);

  const loadReportData = async () => {
    setIsLoading(true);
    try {
      const [revenueReport, ticketTypeRevenueReport, summaryReport] = await Promise.all([
        reportApi.getRevenueReport(),
        reportApi.getTicketTypeRevenueReport(),
        reportApi.getSummaryReport(),
      ]);
      setReportData(prev => ({
        ...prev,
        ...(revenueReport.revenueData && { revenueData: revenueReport.revenueData }),
        ...(ticketTypeRevenueReport.ticketTypeData && { ticketTypeData: ticketTypeRevenueReport.ticketTypeData }),
        ...(summaryReport.summary && { summary: summaryReport.summary }),
      }));
    } catch (error) {
      console.error('Error loading report data:', error);
      toast.error('Lỗi khi tải dữ liệu báo cáo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReportData();
  }, []);

  const handleReload = async () => {
    await loadReportData();
  };

  const handleExport = () => {
    if (!reportData) return;
    const wb = XLSX.utils.book_new();

    // Sheet 1: Summary
    if (reportData.summary) {
      const summarySheet = XLSX.utils.json_to_sheet([
        {
          'Tổng doanh thu': reportData.summary.totalRevenue,
          'Tổng số vé đã bán': reportData.summary.totalTickets,
          'Tổng số sự kiện': reportData.summary.totalEvents,
          'Giá vé trung bình': reportData.summary.averageTicketPrice,
        },
      ]);
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Tổng quan');
    }

    // Sheet 2: Doanh thu theo tháng
    if (reportData.revenueData && Array.isArray(reportData.revenueData)) {
      const revenueSheet = XLSX.utils.json_to_sheet(
        reportData.revenueData.map((item: any) => ({
          'Tháng': item.month,
          'Doanh thu': item.revenue,
        }))
      );
      XLSX.utils.book_append_sheet(wb, revenueSheet, 'Doanh thu theo tháng');
    }

    // Sheet 3: Doanh thu theo loại vé
    if (reportData.ticketTypeData && Array.isArray(reportData.ticketTypeData)) {
      const ticketTypeSheet = XLSX.utils.json_to_sheet(
        reportData.ticketTypeData.map((item: any) => ({
          'Loại vé': item.name,
          'Sự kiện': item.eventName,
          'Giá vé': item.price,
          'Số lượng đã bán': item.quantity,
          'Doanh thu': item.revenue,
        }))
      );
      XLSX.utils.book_append_sheet(wb, ticketTypeSheet, 'Doanh thu theo loại vé');
    }

    // Xuất file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'bao_cao_thong_ke.xlsx');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  console.log('reportData:', reportData);

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Báo cáo & Thống kê</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            disabled={isLoading}
            className="p-2"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-5 w-5 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(reportData.summary?.totalRevenue || 0)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-600">Tổng số vé đã bán</p>
          <p className="text-2xl font-semibold text-gray-900">
            {reportData.summary?.totalTickets || 0}
          </p>
        </Card>
      </div>

      {/* Ticket Type Revenue */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo loại vé</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reportData.ticketTypeData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ name, revenue }) => `${name}: ${formatCurrency(revenue)}`}
              >
                {reportData.ticketTypeData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại vé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sự kiện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá vé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng đã bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.ticketTypeData?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.eventName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 