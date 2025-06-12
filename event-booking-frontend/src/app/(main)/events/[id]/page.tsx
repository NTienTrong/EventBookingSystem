'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';
import { Button } from '@/components/common';
import { formatDate, formatTime } from '@/lib/utils/dateTime';
import { events } from '@/data/mock';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy sự kiện
          </h1>
          <p className="text-gray-600">
            Sự kiện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketQuantity(Number(e.target.value));
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    setIsBookingModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thông tin chính */}
        <div className="lg:col-span-2">
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Còn {event.availableTickets} vé</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
              <div className="whitespace-pre-line">{event.description}</div>
            </div>
          </div>
        </div>

        {/* Đặt vé */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Đặt vé ngay</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Giá vé</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {event.price.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Số lượng</span>
                <select
                  value={ticketQuantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} vé
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Tổng tiền</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {(event.price * ticketQuantity).toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              className="w-full"
              size="lg"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Đặt vé ngay
            </Button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Bạn sẽ nhận được email xác nhận sau khi đặt vé thành công
            </p>
          </div>
        </div>
      </div>

      {/* Modal đặt vé - sẽ được implement sau */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Tính năng đang phát triển</h3>
            <p className="text-gray-600 mb-4">
              Chức năng đặt vé đang được phát triển. Vui lòng quay lại sau!
            </p>
            <Button
              onClick={() => setIsBookingModalOpen(false)}
              className="w-full"
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 