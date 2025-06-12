'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Ticket, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/common';
import { formatDate, formatTime } from '@/lib/utils/dateTime';
import { bookings } from '@/data/mock';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = bookings.find((b) => b.id === params.id);

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy đơn đặt vé
          </h1>
          <p className="text-gray-600">
            Đơn đặt vé bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/profile"
        className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thông tin đơn đặt vé */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={booking.eventImage}
                alt={booking.eventTitle}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{booking.eventTitle}</h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {getStatusText(booking.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{formatTime(booking.time)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2" />
                  <span>{booking.quantity} vé</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold mb-4">Chi tiết vé</h2>
                <div className="space-y-4">
                  {booking.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Ticket className="w-5 h-5 mr-3 text-indigo-600" />
                        <div>
                          <p className="font-medium">{ticket.type}</p>
                          <p className="text-sm text-gray-600">Ghế: {ticket.seat}</p>
                        </div>
                      </div>
                      <span className="font-medium text-indigo-600">
                        {ticket.price.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin thanh toán */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">Thông tin thanh toán</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Thời gian đặt</span>
                <span>
                  {formatDate(booking.bookingDate)} {booking.bookingTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Phương thức</span>
                <span>{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Trạng thái</span>
                <span className="text-green-600 font-medium">
                  {booking.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Tổng tiền</span>
                <span className="text-indigo-600">
                  {booking.totalPrice.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin người đặt</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3" />
                  <span>{booking.customerInfo.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>{booking.customerInfo.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{booking.customerInfo.phone}</span>
                </div>
              </div>
            </div>

            {booking.status === 'confirmed' && (
              <div className="mt-6">
                <Button className="w-full">
                  Tải vé điện tử
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 