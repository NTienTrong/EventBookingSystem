'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react';
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - sẽ được thay thế bằng API call
const mockEvent = {
  id: '1',
  title: 'Music Festival 2024',
  description: 'Đại nhạc hội âm nhạc lớn nhất năm 2024 với sự góp mặt của nhiều nghệ sĩ nổi tiếng.',
  date: '2024-05-15',
  time: '18:00',
  location: 'Sân vận động Mỹ Đình, Hà Nội',
  image: '/images/events/music-festival.jpg',
  category: 'music',
  organizer: 'EventNest',
  ticketTypes: [
    {
      id: '1',
      name: 'VIP',
      price: 2000000,
      quantity: 100,
      sold: 45,
      description: 'Vé VIP bao gồm đồ uống và khu vực riêng',
      benefits: ['Khu vực riêng', 'Đồ uống miễn phí', 'Gặp gỡ nghệ sĩ'],
    },
    {
      id: '2',
      name: 'Standard',
      price: 500000,
      quantity: 400,
      sold: 105,
      description: 'Vé thường',
      benefits: ['Vào cổng', 'Chỗ ngồi thường'],
    },
  ],
};

export default function EventDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>(
    {}
  );

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, quantity),
    }));
  };

  const calculateTotal = () => {
    return mockEvent.ticketTypes.reduce((total, ticket) => {
      return total + (selectedTickets[ticket.id] || 0) * ticket.price;
    }, 0);
  };

  const handleBooking = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Kiểm tra xem có vé nào được chọn không
    const hasSelectedTickets = Object.values(selectedTickets).some((qty) => qty > 0);
    if (!hasSelectedTickets) {
      alert('Vui lòng chọn ít nhất một vé');
      return;
    }

    // TODO: Chuyển đến trang thanh toán với thông tin vé đã chọn
    router.push(`/checkout?eventId=${params.id}&tickets=${JSON.stringify(selectedTickets)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={mockEvent.image}
              alt={mockEvent.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{mockEvent.title}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(mockEvent.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{mockEvent.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{mockEvent.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>Tổ chức bởi {mockEvent.organizer}</span>
              </div>
            </div>
            <p className="text-gray-600">{mockEvent.description}</p>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Chọn vé</h2>
            <div className="space-y-4">
              {mockEvent.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{ticket.name}</h3>
                      <p className="text-sm text-gray-500">{ticket.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-indigo-600">
                        {ticket.price.toLocaleString('vi-VN')} VNĐ
                      </div>
                      <div className="text-sm text-gray-500">
                        Còn {ticket.quantity - ticket.sold} vé
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ticket.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-lg"
                        onClick={() =>
                          handleQuantityChange(
                            ticket.id,
                            (selectedTickets[ticket.id] || 0) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={ticket.quantity - ticket.sold}
                        value={selectedTickets[ticket.id] || 0}
                        onChange={(e) =>
                          handleQuantityChange(ticket.id, parseInt(e.target.value) || 0)
                        }
                        className="w-16 text-center border rounded-lg"
                      />
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-lg"
                        onClick={() =>
                          handleQuantityChange(
                            ticket.id,
                            (selectedTickets[ticket.id] || 0) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="font-semibold">
                      {((selectedTickets[ticket.id] || 0) * ticket.price).toLocaleString(
                        'vi-VN'
                      )}{' '}
                      VNĐ
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="font-semibold text-xl text-indigo-600">
                  {calculateTotal().toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <Button onClick={handleBooking} className="w-full">
                <Ticket className="w-4 h-4 mr-2" />
                {user ? 'Đặt vé ngay' : 'Đăng nhập để đặt vé'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 