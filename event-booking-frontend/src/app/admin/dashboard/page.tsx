'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common';
import { Button } from '@/components/common';
import {
  Users,
  Calendar,
  Ticket,
  ShoppingCart,
  TrendingUp,
  RefreshCw,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { reportApi } from '@/services/api/report';
import { userApi } from '@/services/api/user';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [summary, setSummary] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [ticketTypeData, setTicketTypeData] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [summaryRes, revenueRes, ticketTypeRes, usersRes] = await Promise.all([
        reportApi.getSummaryReport(),
        reportApi.getRevenueReport(),
        reportApi.getTicketTypeRevenueReport(),
        userApi.getAllUsers(),
      ]);
      setSummary(summaryRes.summary);
      setRevenueData(revenueRes.revenueData || []);
      setTicketTypeData(ticketTypeRes.ticketTypeData || []);
      setTotalUsers(usersRes.length);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tổng quan</h1>
          <p className="text-sm text-gray-500">Cập nhật lần cuối: {currentTime.toLocaleTimeString('vi-VN')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={loadDashboardData}
            disabled={isLoading}
            className="p-2"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Tổng doanh thu</p>
              <p className="text-2xl font-semibold text-blue-900">{formatCurrency(summary?.totalRevenue || 0)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Tổng vé đã bán</p>
              <p className="text-2xl font-semibold text-green-900">{summary?.totalTickets || 0}</p>
            </div>
            <Ticket className="h-8 w-8 text-green-400" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Tổng sự kiện</p>
              <p className="text-2xl font-semibold text-yellow-900">{summary?.totalEvents || 0}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Tổng người dùng</p>
              <p className="text-2xl font-semibold text-purple-900">{totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Ticket Type Pie Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tỉ lệ loại vé đã bán</h2>
        <div className="h-80 flex items-center justify-center">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={ticketTypeData}
                dataKey="quantity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={({ name, quantity }) => `${name}: ${quantity}`}
              >
                {ticketTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
} 