'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Ticket, Users, ChartBar, Settings } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Mock data for quick stats
  const stats = {
    upcomingEvents: 12,
    ticketsSold: 458,
    totalRevenue: "45.800.000",
    activeUsers: 2500
  };

  return (
    <div className="space-y-12">
      {/* Hero Section - Show only when not authenticated */}
      {!isAuthenticated && (
        <section className="relative h-[600px] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-6">Khám phá sự kiện tuyệt vời</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Tìm và đặt vé cho những sự kiện hấp dẫn nhất trong khu vực của bạn. 
              Từ âm nhạc, thể thao đến hội thảo - tất cả đều có tại đây!
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" className="text-lg px-8">
                  Đăng ký ngay
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Admin Dashboard - Show only for admin users */}
      {isAuthenticated && isAdmin && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Tổng quan hệ thống</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <span className="text-sm font-medium text-gray-400">Sự kiện</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats.upcomingEvents}</span>
                <span className="text-sm text-gray-500">Sự kiện sắp diễn ra</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Ticket className="h-8 w-8 text-green-600" />
                <span className="text-sm font-medium text-gray-400">Vé</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats.ticketsSold}</span>
                <span className="text-sm text-gray-500">Vé đã bán</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <ChartBar className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium text-gray-400">Doanh thu</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats.totalRevenue} đ</span>
                <span className="text-sm text-gray-500">Tổng doanh thu</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-gray-400">Người dùng</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats.activeUsers}</span>
                <span className="text-sm text-gray-500">Người dùng hoạt động</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Link href="/admin/events" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Quản lý sự kiện</h3>
                <p className="text-gray-600">Tạo và quản lý các sự kiện, cập nhật thông tin và theo dõi tình trạng vé.</p>
              </div>
            </Link>

            <Link href="/admin/orders" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Quản lý đơn hàng</h3>
                <p className="text-gray-600">Xem và quản lý các đơn đặt vé, cập nhật trạng thái và xử lý hoàn tiền.</p>
              </div>
            </Link>

            <Link href="/admin/reports" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Báo cáo & Thống kê</h3>
                <p className="text-gray-600">Xem báo cáo chi tiết về doanh thu, số lượng vé bán ra và phân tích xu hướng.</p>
              </div>
            </Link>

            <Link href="/admin/settings" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Cài đặt hệ thống</h3>
                <p className="text-gray-600">Quản lý cấu hình hệ thống, phân quyền và các thiết lập khác.</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Customer Dashboard - Show for authenticated non-admin users */}
      {isAuthenticated && !isAdmin && (
        <div className="space-y-8">
          <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Chào mừng trở lại, {user?.fullName}! 👋</h2>
              <p className="text-gray-600 mb-6">
                Khám phá những sự kiện mới nhất và quản lý vé của bạn một cách dễ dàng.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/events">
                  <Button className="w-full justify-center py-3 text-lg">
                    Khám phá sự kiện
                  </Button>
                </Link>
                <Link href="/orders/my-orders">
                  <Button variant="outline" className="w-full justify-center py-3 text-lg">
                    Vé của tôi
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Featured Events Section - Show for everyone */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sự kiện nổi bật</h2>
          <Link href="/events">
            <Button variant="ghost">Xem tất cả</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock featured events */}
          {[1, 2, 3].map((event) => (
            <div key={event} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={`/images/events/event-${event}.jpg`}
                  alt={`Event ${event}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-indigo-600 mb-1">Âm nhạc</div>
                <h3 className="text-xl font-semibold mb-2">Music Festival 2024</h3>
                <p className="text-gray-600 mb-4">Trải nghiệm âm nhạc đỉnh cao với các nghệ sĩ hàng đầu</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">500.000 đ</span>
                  <Button size="sm">Đặt vé ngay</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section - Show for everyone */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Khám phá theo danh mục</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Âm nhạc', icon: '🎵' },
            { name: 'Thể thao', icon: '⚽' },
            { name: 'Nghệ thuật', icon: '🎨' },
            { name: 'Hội thảo', icon: '💡' },
          ].map((category) => (
            <Link href={`/events?category=${category.name}`} key={category.name}>
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <span className="text-3xl mb-2 block">{category.icon}</span>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 