'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Calendar,
  MapPin,
  Filter,
  X,
  Clock,
  Users,
  Eye,
  RefreshCw,
  Ticket,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { eventsApi } from '@/services/api/events';
import { EventDTO } from '@/types/event';

const categories = [
  'Tất cả',
  'Công nghệ',
  'Giáo dục',
  'Âm nhạc',
  'Thể thao',
  'Ẩm thực',
  'Nghệ thuật',
];

export default function EventsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Không thể tải danh sách sự kiện');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'Tất cả') {
      result = result.filter(event => event.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'Tất cả') {
      result = result.filter(event => event.location === selectedLocation);
    }

    setFilteredEvents(result);
  }, [searchQuery, selectedCategory, selectedLocation, events]);

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

  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'Ngày không xác định';
    }
    try {
      const date = parseISO(dateString);
      return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Ngày không hợp lệ';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sự kiện</h1>
            <p className="text-gray-500 mt-1">Khám phá và đặt vé sự kiện</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
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
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory('Tất cả');
                setSelectedLocation('Tất cả');
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thể loại
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'ONGOING' ? 'bg-green-100 text-green-800' :
                  event.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {event.status === 'UPCOMING' ? 'Sắp diễn ra' :
                   event.status === 'ONGOING' ? 'Đang diễn ra' :
                   event.status === 'COMPLETED' ? 'Đã kết thúc' :
                   'Đã hủy'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{event.availableTickets} vé còn lại</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => router.push(`/customer/events/${event.id}/booking`)}
                >
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy sự kiện nào phù hợp với bộ lọc của bạn.</p>
        </div>
      )}
    </div>
  );
} 