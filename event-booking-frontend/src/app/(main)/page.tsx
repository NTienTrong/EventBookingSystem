'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import Link from "next/link";
import { Calendar, Ticket, Users, ChartBar, Settings } from "lucide-react";

export default function Home() {
  // Mock data for quick stats
  const stats = {
    upcomingEvents: 12,
    ticketsSold: 458,
    totalRevenue: "45.800.000",
    activeUsers: 2500
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Khám phá sự kiện tuyệt vời</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Tìm và đặt vé cho những sự kiện hấp dẫn nhất trong khu vực của bạn. 
            Từ âm nhạc, thể thao đến hội thảo - tất cả đều có tại đây!
          </p>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8">
                Đăng ký ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
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

      {/* Categories Section */}
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