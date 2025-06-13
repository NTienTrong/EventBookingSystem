'use client';

import { mockOrders } from '@/data/mock';
import { mockEvents } from '@/data/mock';

interface PopularEventsTableProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function PopularEventsTable({ dateRange }: PopularEventsTableProps) {
  // Calculate event statistics
  const eventStats = mockOrders
    .filter(
      (order) =>
        new Date(order.createdAt) >= dateRange.from &&
        new Date(order.createdAt) <= dateRange.to
    )
    .reduce((acc, order) => {
      const eventId = order.eventId;
      if (!acc[eventId]) {
        const event = mockEvents.find((e) => e.id === eventId);
        acc[eventId] = {
          id: eventId,
          name: event?.name || 'Unknown Event',
          ticketsSold: 0,
          revenue: 0,
          image: event?.image || '',
        };
      }
      acc[eventId].ticketsSold += order.tickets.reduce(
        (sum, ticket) => sum + ticket.quantity,
        0
      );
      acc[eventId].revenue += order.totalAmount;
      return acc;
    }, {} as Record<string, any>);

  // Convert to array and sort by revenue
  const popularEvents = Object.values(eventStats).sort(
    (a, b) => b.revenue - a.revenue
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sự kiện
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vé đã bán
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doanh thu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tỷ lệ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {popularEvents.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.ticketsSold.toLocaleString('vi-VN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.revenue.toLocaleString('vi-VN')} VNĐ
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${(event.revenue / popularEvents[0].revenue) * 100}%`,
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 