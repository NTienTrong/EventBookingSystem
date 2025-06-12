'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Edit2, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common';
import { formatDate, formatTime } from '@/lib/utils/dateTime';
import { bookings } from '@/data/mock';
import { mockUsers } from '@/data/mock/users';

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(mockUsers[0]); // Using first user as example

  const handleSaveProfile = () => {
    // TODO: Implement save profile logic
    setIsEditMode(false);
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thông tin cá nhân */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditMode ? 'Hủy' : 'Chỉnh sửa'}
              </Button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={userInfo.avatar || '/images/avatar-placeholder.jpg'}
                  alt={userInfo.fullName}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{userInfo.fullName}</h3>
            </div>

            <div className="space-y-4">
              {isEditMode ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      value={userInfo.fullName}
                      onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full">
                    Lưu thay đổi
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3" />
                    <span>{userInfo.fullName}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{userInfo.role === 'admin' ? 'Admin' : 'Khách hàng'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lịch sử đặt vé */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Lịch sử đặt vé</h2>

            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col md:flex-row items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                >
                  <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{booking.eventTitle}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatTime(booking.time)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-sm">{booking.quantity} vé</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-indigo-600">
                        {booking.totalPrice.toLocaleString('vi-VN')} VNĐ
                      </span>
                      <Link href={`/profile/bookings/${booking.id}`}>
                        <Button variant="outline" size="sm">
                          Chi tiết
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
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