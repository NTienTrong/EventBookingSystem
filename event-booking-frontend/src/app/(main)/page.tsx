'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import Link from "next/link";
import { Calendar, Ticket, Users } from "lucide-react";
import { eventApi } from '@/services/api/event';
import { eventsApi } from '@/services/api/events';
import { reportApi } from '@/services/api/report';
import { userApi } from '@/services/api/user';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const mockStats = {
  upcomingEvents: 8,
  ticketsSold: 1234,
  activeUsers: 567
};

const mockFeaturedEvents = [
  {
    id: '1',
    name: 'Summer Music Fest',
    description: 'Đại nhạc hội mùa hè với các nghệ sĩ nổi tiếng.',
    imageUrl: '/images/summerMusicFest.png',
    category: 'Âm nhạc',
    price: 500000
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    description: 'Hội thảo công nghệ lớn nhất năm 2024.',
    imageUrl: '/images/techConference2024.png',
    category: 'Hội thảo',
    price: 0
  },
  {
    id: '3',
    name: 'Art Expo',
    description: 'Triển lãm nghệ thuật đương đại.',
    imageUrl: '/images/artExpo.png',
    category: 'Nghệ thuật',
    price: 200000
  }
];

const mockCategories = [
  { name: 'Âm nhạc', icon: '🎵' },
  { name: 'Thể thao', icon: '⚽' },
  { name: 'Nghệ thuật', icon: '🎨' },
  { name: 'Hội thảo', icon: '💡' }
];

export default function Home() {
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    ticketsSold: 0,
    activeUsers: 0
  });
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [summaryRes, usersRes, eventsRes, categoriesRes] = await Promise.all([
          reportApi.getSummaryReport(),
          userApi.getAllUsers(),
          eventApi.getAllEvents(),
          eventsApi.getCategories()
        ]);
        setStats({
          upcomingEvents: summaryRes.summary?.totalEvents || 0,
          ticketsSold: summaryRes.summary?.totalTickets || 0,
          activeUsers: usersRes.length || 0
        });
        const sortedEvents = (eventsRes.data || []).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setFeaturedEvents(sortedEvents.slice(0, 3));
        setCategories(categoriesRes.data?.slice(0, 4) || []);
        setIsLoggedIn(!!localStorage.getItem('token'));
      } catch (error) {
        console.error('Error loading homepage stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleViewDetail = (eventId: string) => {
    toast('Vui lòng đăng nhập để xem chi tiết sự kiện!', {
      icon: '🔒',
      style: {
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      },
    });
  };

  const handleViewAll = () => {
    toast('Vui lòng đăng nhập để xem tất cả sự kiện!', {
      icon: '🔒',
      style: {
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      },
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Khám phá & Đặt vé sự kiện</h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl opacity-90">
            Tìm kiếm, trải nghiệm và đặt vé cho những sự kiện hấp dẫn nhất quanh bạn.
          </p>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 shadow-md">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 shadow-md">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <Ticket className="h-8 w-8 text-indigo-500 mb-2" />
            <div className="text-2xl font-bold">{mockStats.ticketsSold}</div>
            <div className="text-gray-500 mt-1">Vé đã bán</div>
          </div>
          <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <Calendar className="h-8 w-8 text-orange-500 mb-2" />
            <div className="text-2xl font-bold">{mockStats.upcomingEvents}</div>
            <div className="text-gray-500 mt-1">Sự kiện</div>
          </div>
          <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <Users className="h-8 w-8 text-purple-500 mb-2" />
            <div className="text-2xl font-bold">{mockStats.activeUsers}</div>
            <div className="text-gray-500 mt-1">Người dùng</div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sự kiện nổi bật</h2>
          <Button variant="ghost" onClick={handleViewAll}>Xem tất cả</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeaturedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-44">
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-indigo-600 mb-1">{event.category}</div>
                <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">{event.price ? event.price.toLocaleString('vi-VN') + ' đ' : 'Miễn phí'}</span>
                  <Button size="sm" onClick={() => handleViewDetail(event.id)}>
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Danh mục sự kiện</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer đơn giản */}
      <footer className="text-center text-gray-400 py-8">
        &copy; {new Date().getFullYear()} EventBooking. Đặt vé sự kiện dễ dàng.
      </footer>
    </div>
  );
} 