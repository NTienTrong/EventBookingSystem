'use client';

import { Card } from '@/components/common';
import { TrendingUp, TrendingDown, Ticket, Calendar } from 'lucide-react';
import { mockOrders } from '@/data/mock';

interface StatsCardsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function StatsCards({ dateRange }: StatsCardsProps) {
  // Calculate stats based on date range
  const stats = {
    revenue: {
      total: mockOrders
        .filter(
          (order) =>
            new Date(order.createdAt) >= dateRange.from &&
            new Date(order.createdAt) <= dateRange.to
        )
        .reduce((sum, order) => sum + order.totalAmount, 0),
      trend: 12.5, // Phần trăm tăng/giảm so với kỳ trước
    },
    tickets: {
      total: mockOrders
        .filter(
          (order) =>
            new Date(order.createdAt) >= dateRange.from &&
            new Date(order.createdAt) <= dateRange.to
        )
        .reduce((sum, order) => sum + order.tickets.reduce((s, t) => s + t.quantity, 0), 0),
      trend: 8.2,
    },
    events: {
      total: mockOrders
        .filter(
          (order) =>
            new Date(order.createdAt) >= dateRange.from &&
            new Date(order.createdAt) <= dateRange.to
        )
        .reduce((events, order) => {
          if (!events.includes(order.eventId)) {
            events.push(order.eventId);
          }
          return events;
        }, [] as string[]).length,
      trend: -2.1,
    },
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Revenue Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Doanh thu</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.revenue.total.toLocaleString('vi-VN')} VNĐ
            </p>
          </div>
          <div
            className={`flex items-center ${
              stats.revenue.trend >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {stats.revenue.trend >= 0 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            <span className="ml-1 text-sm font-medium">
              {Math.abs(stats.revenue.trend)}%
            </span>
          </div>
        </div>
      </Card>

      {/* Tickets Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Vé đã bán</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.tickets.total.toLocaleString('vi-VN')}
            </p>
          </div>
          <div
            className={`flex items-center ${
              stats.tickets.trend >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {stats.tickets.trend >= 0 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            <span className="ml-1 text-sm font-medium">
              {Math.abs(stats.tickets.trend)}%
            </span>
          </div>
        </div>
      </Card>

      {/* Events Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Sự kiện</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.events.total}
            </p>
          </div>
          <div
            className={`flex items-center ${
              stats.events.trend >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {stats.events.trend >= 0 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            <span className="ml-1 text-sm font-medium">
              {Math.abs(stats.events.trend)}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
} 