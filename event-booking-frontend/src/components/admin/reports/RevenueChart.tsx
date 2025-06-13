'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockOrders } from '@/data/mock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function RevenueChart({ dateRange }: RevenueChartProps) {
  // Group orders by date and calculate daily revenue
  const dailyRevenue = mockOrders
    .filter(
      (order) =>
        new Date(order.createdAt) >= dateRange.from &&
        new Date(order.createdAt) <= dateRange.to
    )
    .reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString('vi-VN');
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(dailyRevenue),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: Object.values(dailyRevenue),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y.toLocaleString('vi-VN')} VNĐ`;
          },
        },
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
          callback: function(tickValue: number | string) {
            const value = Number(tickValue);
            return value.toLocaleString('vi-VN') + ' VNĐ';
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
} 