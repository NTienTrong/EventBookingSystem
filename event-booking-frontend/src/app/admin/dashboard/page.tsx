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
  TrendingDown,
  RefreshCw,
  Bell,
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data - sẽ được thay thế bằng dữ liệu thực từ API
const mockData = {
  totalUsers: 1250,
  totalEvents: 45,
  totalTickets: 3200,
  totalOrders: 890,
  revenue: {
    current: 125000000,
    previous: 98000000,
  },
  realTimeStats: {
    activeUsers: 156,
    ticketsSoldToday: 45,
    revenueToday: 4500000,
    ordersToday: 12,
  },
  upcomingEvents: [
    {
      id: 1,
      name: 'Hội thảo Công nghệ 2024',
      date: '2024-03-15',
      time: '09:00',
      location: 'Hội trường A',
      remainingTickets: 50,
      totalTickets: 200,
    },
    {
      id: 2,
      name: 'Workshop Marketing Digital',
      date: '2024-03-20',
      time: '14:00',
      location: 'Phòng họp B',
      remainingTickets: 30,
      totalTickets: 100,
    },
    {
      id: 3,
      name: 'Concert Mùa Hè',
      date: '2024-04-01',
      time: '19:00',
      location: 'Sân vận động X',
      remainingTickets: 100,
      totalTickets: 500,
    },
  ],
  recentOrders: [
    {
      id: 'ORD001',
      customer: 'Nguyễn Văn A',
      amount: 1500000,
      status: 'completed',
      date: '2024-03-10',
    },
    {
      id: 'ORD002',
      customer: 'Trần Thị B',
      amount: 2500000,
      status: 'pending',
      date: '2024-03-11',
    },
    {
      id: 'ORD003',
      customer: 'Lê Văn C',
      amount: 1800000,
      status: 'processing',
      date: '2024-03-12',
    },
  ],
  salesData: [
    { time: '00:00', sales: 0 },
    { time: '04:00', sales: 0 },
    { time: '08:00', sales: 5 },
    { time: '12:00', sales: 15 },
    { time: '16:00', sales: 10 },
    { time: '20:00', sales: 8 },
    { time: '24:00', sales: 0 },
  ],
  ticketDistribution: [
    { name: 'Vé thường', value: 1200 },
    { name: 'Vé VIP', value: 500 },
    { name: 'Vé đặc biệt', value: 300 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReload = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement reload logic
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error reloading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Tổng quan
          </h1>
          <p className="text-sm text-gray-500">
            Cập nhật lần cuối: {formatTime(currentTime)}
          </p>
        </div>
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
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Người dùng đang hoạt động</p>
              <p className="text-2xl font-semibold text-blue-900">{mockData.realTimeStats.activeUsers}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Vé bán hôm nay</p>
              <p className="text-2xl font-semibold text-green-900">{mockData.realTimeStats.ticketsSoldToday}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <Ticket className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Doanh thu hôm nay</p>
              <p className="text-2xl font-semibold text-purple-900">
                {formatCurrency(mockData.realTimeStats.revenueToday)}
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Đơn hàng hôm nay</p>
              <p className="text-2xl font-semibold text-orange-900">{mockData.realTimeStats.ordersToday}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-full">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sự kiện sắp diễn ra</h2>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
        <div className="space-y-4">
          {mockData.upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.date} {event.time}
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {event.remainingTickets}/{event.totalTickets} vé còn lại
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${(event.remainingTickets / event.totalTickets) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh số theo giờ</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  name="Số vé bán ra"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố loại vé</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.ticketDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.ticketDistribution.map((entry, index) => (
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

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
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