'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockOrders } from '@/data/mock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TicketSalesChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function TicketSalesChart({ dateRange }: TicketSalesChartProps) {
  // Group orders by date and calculate daily ticket sales
  const dailyTicketSales = mockOrders
    .filter(
      (order) =>
        new Date(order.createdAt) >= dateRange.from &&
        new Date(order.createdAt) <= dateRange.to
    )
    .reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString('vi-VN');
      acc[date] = (acc[date] || 0) + order.tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(dailyTicketSales),
    datasets: [
      {
        label: 'Số vé bán ra',
        data: Object.values(dailyTicketSales),
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
} 