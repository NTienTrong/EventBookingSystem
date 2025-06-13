'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Download,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Ticket {
  id: string;
  code: string;
  eventName: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
  ticketType: string;
  status: 'active' | 'used' | 'cancelled';
  price: number;
}

export default function TicketsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated data
        const fakeTickets: Ticket[] = [
          {
            id: '1',
            code: 'EVENT-2024-001',
            eventName: 'Hội thảo Công nghệ 2024',
            eventImage: '/images/event1.jpg',
            eventDate: '2024-03-15T09:00:00',
            eventLocation: 'Hà Nội',
            ticketType: 'Vé thường',
            status: 'active',
            price: 500000,
          },
          {
            id: '2',
            code: 'EVENT-2024-002',
            eventName: 'Workshop Marketing Digital',
            eventImage: '/images/event2.jpg',
            eventDate: '2024-03-20T14:00:00',
            eventLocation: 'TP. Hồ Chí Minh',
            ticketType: 'Vé VIP',
            status: 'used',
            price: 1000000,
          },
          {
            id: '3',
            code: 'EVENT-2024-003',
            eventName: 'Hội thảo Khởi nghiệp',
            eventImage: '/images/event3.jpg',
            eventDate: '2024-04-01T08:00:00',
            eventLocation: 'Đà Nẵng',
            ticketType: 'Vé thường',
            status: 'active',
            price: 300000,
          },
        ];

        setTickets(fakeTickets);
        setFilteredTickets(fakeTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === selectedStatus);
    }

    setFilteredTickets(filtered);
  }, [searchQuery, selectedStatus, tickets]);

  const handleDownloadTicket = (ticketId: string) => {
    // TODO: Implement ticket download
    console.log('Downloading ticket:', ticketId);
  };

  const handleViewEvent = (eventId: string) => {
    router.push(`/customer/events/${eventId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Chưa sử dụng';
      case 'used':
        return 'Đã sử dụng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const handleReload = async () => {
    setReloading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh data here
    } catch (error) {
      console.error('Error reloading:', error);
    } finally {
      setReloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vé của tôi</h1>
            <p className="text-gray-500 mt-1">Quản lý và tải vé sự kiện</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm vé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Lọc
            </Button>
            <Button
              variant="outline"
              onClick={handleReload}
              disabled={reloading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${reloading ? 'animate-spin' : ''}`} />
              Tải lại
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Chưa sử dụng</option>
                  <option value="used">Đã sử dụng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={ticket.eventImage}
                alt={ticket.eventName}
                className="object-cover w-full h-48"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                  {getStatusText(ticket.status)}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.price)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{ticket.eventName}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(ticket.eventDate), 'dd/MM/yyyy', { locale: vi })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(ticket.eventDate), 'HH:mm', { locale: vi })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {ticket.eventLocation}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewEvent(ticket.id)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Xem chi tiết
                </Button>
                {ticket.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadTicket(ticket.id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Tải vé
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy vé nào.</p>
        </div>
      )}
    </div>
  );
} 