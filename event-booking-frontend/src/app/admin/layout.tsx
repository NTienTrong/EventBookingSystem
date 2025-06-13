'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  ShoppingCart,
  Users,
  BarChart,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  {
    title: 'Tổng quan',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Quản lý sự kiện',
    href: '/admin/events',
    icon: Calendar,
    gradient: 'from-green-500 to-green-600',
  },
  {
    title: 'Quản lý vé',
    href: '/admin/tickets',
    icon: Ticket,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Quản lý đơn hàng',
    href: '/admin/orders',
    icon: ShoppingCart,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Quản lý người dùng',
    href: '/admin/users',
    icon: Users,
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    title: 'Báo cáo & Thống kê',
    href: '/admin/reports',
    icon: BarChart,
    gradient: 'from-indigo-500 to-indigo-600',
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      return;
    }

    if (user && user.role !== 'admin') {
      console.log('Unauthorized access to admin area, redirecting...');
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (user && user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 shadow-lg z-30 transition-all duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
            <Link href="/admin/dashboard" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">EventNest</span>
              <span className="text-sm font-medium text-gray-400 group-hover:text-blue-300 transition-colors duration-200">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-700">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                        ${isActive 
                          ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg transform scale-105' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-700 group-hover:bg-gray-600'}`}>
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto text-white/50" />
                      )}
                  </Link>
                </li>
                );
              })}
            </ul>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{user?.fullName?.charAt(0)}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden hidden">
        {/* Mobile menu content */}
      </div>
    </div>
  );
} 