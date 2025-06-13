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
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  price: number;
  remainingTickets: number;
  totalTickets: number;
  imageUrl: string;
}

const categories = [
  'Tất cả',
  'Công nghệ',
  'Giáo dục',
  'Âm nhạc',
  'Thể thao',
  'Ẩm thực',
  'Nghệ thuật',
];

const locations = [
  'Tất cả',
  'Hà Nội',
  'TP.HCM',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
];

export default function EventsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated data
        const fakeEvents: Event[] = [
          {
            id: '1',
            name: 'Hội thảo Công nghệ 2024',
            description: 'Hội thảo về các xu hướng công nghệ mới nhất',
            startTime: '2024-03-15T09:00:00',
            endTime: '2024-03-15T17:00:00',
            location: 'Hà Nội',
            category: 'Công nghệ',
            price: 500000,
            remainingTickets: 50,
            totalTickets: 100,
            imageUrl: '/images/event1.jpg',
          },
          {
            id: '2',
            name: 'Workshop Marketing Digital',
            description: 'Học cách làm marketing hiệu quả trên các nền tảng số',
            startTime: '2024-03-20T13:00:00',
            endTime: '2024-03-20T17:00:00',
            location: 'TP.HCM',
            category: 'Giáo dục',
            price: 300000,
            remainingTickets: 30,
            totalTickets: 50,
            imageUrl: '/images/event2.jpg',
          },
          // Add more fake events here
        ];

        setEvents(fakeEvents);
        setFilteredEvents(fakeEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
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
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(event.startTime), 'dd/MM/yyyy', { locale: vi })}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(event.startTime), 'HH:mm', { locale: vi })} - {format(new Date(event.endTime), 'HH:mm', { locale: vi })}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {event.remainingTickets}/{event.totalTickets} vé
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(event.startTime), 'dd/MM/yyyy', { locale: vi })}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Còn lại: {event.remainingTickets} vé
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/customer/events/${event.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Chi tiết
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/customer/events/${event.id}/booking`)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Đặt vé
                  </Button>
                </div>
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