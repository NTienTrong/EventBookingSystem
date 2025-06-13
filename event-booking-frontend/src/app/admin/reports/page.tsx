'use client';

import { useState } from 'react';
import { Card } from '@/components/common';
import { Button } from '@/components/common';
import { RefreshCw, Download, Calendar } from 'lucide-react';
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
  revenueData: [
    { month: 'T1', revenue: 15000000 },
    { month: 'T2', revenue: 18000000 },
    { month: 'T3', revenue: 22000000 },
    { month: 'T4', revenue: 25000000 },
    { month: 'T5', revenue: 28000000 },
    { month: 'T6', revenue: 30000000 },
  ],
  ticketTypeData: [
    { name: 'Vé thường', value: 1200 },
    { name: 'Vé VIP', value: 500 },
    { name: 'Vé đặc biệt', value: 300 },
  ],
  popularEvents: [
    { name: 'Hội thảo Công nghệ', tickets: 500 },
    { name: 'Workshop Marketing', tickets: 400 },
    { name: 'Concert Mùa Hè', tickets: 300 },
    { name: 'Hội chợ Việc làm', tickets: 250 },
    { name: 'Triển lãm Nghệ thuật', tickets: 200 },
  ],
  summary: {
    totalRevenue: 138000000,
    totalTickets: 3200,
    totalEvents: 45,
    averageTicketPrice: 43125,
  },
  userActivity: {
    totalUsers: 1250,
    activeUsers: 850,
    newUsers: 150,
    userActivityData: [
      { date: 'T1', active: 650, new: 120 },
      { date: 'T2', active: 700, new: 130 },
      { date: 'T3', active: 750, new: 140 },
      { date: 'T4', active: 800, new: 145 },
      { date: 'T5', active: 820, new: 148 },
      { date: 'T6', active: 850, new: 150 },
    ],
  },
  userTicketHistory: [
    {
      userId: 'USR001',
      userName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      totalTickets: 5,
      totalSpent: 2500000,
      lastPurchase: '2024-03-15',
      events: ['Hội thảo Công nghệ', 'Workshop Marketing'],
    },
    {
      userId: 'USR002',
      userName: 'Trần Thị B',
      email: 'tranthib@email.com',
      totalTickets: 3,
      totalSpent: 1500000,
      lastPurchase: '2024-03-10',
      events: ['Concert Mùa Hè'],
    },
    {
      userId: 'USR003',
      userName: 'Lê Văn C',
      email: 'levanc@email.com',
      totalTickets: 8,
      totalSpent: 4000000,
      lastPurchase: '2024-03-12',
      events: ['Hội thảo Công nghệ', 'Workshop Marketing', 'Hội chợ Việc làm'],
    },
  ],
  userEventHistory: [
    {
      eventId: 'EVT001',
      eventName: 'Hội thảo Công nghệ',
      date: '2024-03-15',
      totalParticipants: 500,
      userDemographics: {
        ageGroups: [
          { range: '18-24', count: 150 },
          { range: '25-34', count: 200 },
          { range: '35-44', count: 100 },
          { range: '45+', count: 50 },
        ],
        gender: [
          { type: 'Nam', count: 300 },
          { type: 'Nữ', count: 200 },
        ],
      },
    },
    {
      eventId: 'EVT002',
      eventName: 'Workshop Marketing',
      date: '2024-03-20',
      totalParticipants: 400,
      userDemographics: {
        ageGroups: [
          { range: '18-24', count: 120 },
          { range: '25-34', count: 180 },
          { range: '35-44', count: 70 },
          { range: '45+', count: 30 },
        ],
        gender: [
          { type: 'Nam', count: 220 },
          { type: 'Nữ', count: 180 },
        ],
      },
    },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('month'); // month, quarter, year

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

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Exporting report...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Báo cáo & Thống kê
        </h1>
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

      {/* Date Range Selector */}
      <div className="flex items-center space-x-4">
        <Button
          variant={dateRange === 'month' ? 'default' : 'outline'}
          onClick={() => setDateRange('month')}
        >
          Tháng
        </Button>
        <Button
          variant={dateRange === 'quarter' ? 'default' : 'outline'}
          onClick={() => setDateRange('quarter')}
        >
          Quý
        </Button>
        <Button
          variant={dateRange === 'year' ? 'default' : 'outline'}
          onClick={() => setDateRange('year')}
        >
          Năm
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(mockData.summary.totalRevenue)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Tổng số vé đã bán</p>
            <p className="text-2xl font-semibold text-gray-900">
              {mockData.summary.totalTickets}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Tổng số sự kiện</p>
            <p className="text-2xl font-semibold text-gray-900">
              {mockData.summary.totalEvents}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Giá vé trung bình</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(mockData.summary.averageTicketPrice)}
            </p>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo thời gian</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* User Activity Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động người dùng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Tổng người dùng</p>
            <p className="text-2xl font-semibold text-blue-900">{mockData.userActivity.totalUsers}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-600">Người dùng hoạt động</p>
            <p className="text-2xl font-semibold text-green-900">{mockData.userActivity.activeUsers}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-purple-600">Người dùng mới</p>
            <p className="text-2xl font-semibold text-purple-900">{mockData.userActivity.newUsers}</p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.userActivity.userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#10B981" name="Người dùng hoạt động" />
              <Line type="monotone" dataKey="new" stroke="#8B5CF6" name="Người dùng mới" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* User Ticket History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử mua vé của người dùng</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng vé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng chi tiêu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mua gần nhất
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sự kiện đã tham gia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.userTicketHistory.map((user) => (
                <tr key={user.userId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.totalTickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(user.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastPurchase}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.events.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Event History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê tham gia sự kiện</h2>
        <div className="space-y-6">
          {mockData.userEventHistory.map((event) => (
            <div key={event.eventId} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.eventName}</h3>
                  <p className="text-sm text-gray-500">Ngày: {event.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Tổng người tham gia</p>
                  <p className="text-2xl font-semibold text-indigo-600">{event.totalParticipants}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Phân bố độ tuổi</h4>
                  <div className="space-y-2">
                    {event.userDemographics.ageGroups.map((group) => (
                      <div key={group.range} className="flex items-center">
                        <span className="w-20 text-sm text-gray-500">{group.range}</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600"
                            style={{
                              width: `${(group.count / event.totalParticipants) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{group.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Gender Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Phân bố giới tính</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={event.userDemographics.gender}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {event.userDemographics.gender.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Ticket Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố loại vé</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.ticketTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.ticketTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Popular Events */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sự kiện phổ biến</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.popularEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets" fill="#8884d8" name="Số vé đã bán" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê chi tiết</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sự kiện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số vé đã bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá vé trung bình
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.popularEvents.map((event, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.tickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(event.tickets * 50000)} {/* Giả định giá vé 50,000đ */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(50000)} {/* Giả định giá vé 50,000đ */}
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