'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Ticket,
  DollarSign,
  ArrowLeft,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/common';
import { formatCurrency, formatDate } from '@/utils/format';

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  category: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  organizer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sold: number;
  }[];
  totalTickets: number;
  soldTickets: number;
  revenue: number;
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated data
        const fakeEvent: Event = {
          id: params.id,
          name: 'Hội thảo Công nghệ 2024',
          description: 'Hội thảo về các xu hướng công nghệ mới nhất trong năm 2024, với sự tham gia của các chuyên gia hàng đầu trong ngành.',
          startDate: '2024-05-15T09:00:00',
          endDate: '2024-05-15T17:00:00',
          location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
          category: 'Công nghệ',
          status: 'UPCOMING',
          organizer: {
            id: '1',
            name: 'Công ty TNHH ABC',
            email: 'contact@abc.com',
            phone: '0123456789',
          },
          ticketTypes: [
            {
              id: '1',
              name: 'Vé thường',
              price: 500000,
              quantity: 200,
              sold: 120,
            },
            {
              id: '2',
              name: 'Vé VIP',
              price: 1000000,
              quantity: 50,
              sold: 30,
            },
          ],
          totalTickets: 250,
          soldTickets: 150,
          revenue: 90000000,
        };

        setEvent(fakeEvent);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Không thể tải thông tin sự kiện');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Đã xảy ra lỗi</h2>
          <p className="text-gray-600 mb-4">{error || 'Không tìm thấy thông tin sự kiện'}</p>
          <Button onClick={() => router.push('/admin/events')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/admin/events')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>

      {/* Event Info */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(event.startDate)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.category}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Mô tả</h2>
            <p className="text-gray-600">{event.description}</p>
          </div>

          {/* Organizer Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Thông tin tổ chức</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium">{event.organizer.name}</p>
              <p className="text-gray-600">{event.organizer.email}</p>
              <p className="text-gray-600">{event.organizer.phone}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Ticket className="h-5 w-5" />
                <h3 className="font-medium">Vé đã bán</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {event.soldTickets}/{event.totalTickets}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <DollarSign className="h-5 w-5" />
                <h3 className="font-medium">Doanh thu</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(event.revenue)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Clock className="h-5 w-5" />
                <h3 className="font-medium">Trạng thái</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {event.status === 'UPCOMING' && 'Sắp diễn ra'}
                {event.status === 'ONGOING' && 'Đang diễn ra'}
                {event.status === 'COMPLETED' && 'Đã kết thúc'}
                {event.status === 'CANCELLED' && 'Đã hủy'}
              </p>
            </div>
          </div>

          {/* Ticket Types */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Loại vé</h2>
            <div className="space-y-4">
              {event.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                    <p className="text-gray-600">{formatCurrency(ticket.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Đã bán: {ticket.sold}/{ticket.quantity}
                    </p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${(ticket.sold / ticket.quantity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 