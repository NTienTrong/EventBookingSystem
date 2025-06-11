// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button'; // Import Button từ common

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Giả lập trạng thái đăng nhập (sẽ thay bằng context/store sau)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thay đổi để thử nghiệm

  const navLinks = [
    { name: 'Sự kiện', href: '/events' },
    { name: 'Đơn hàng của tôi', href: '/orders/my-orders' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Thay thế bằng logo thực tế của bạn */}
              <span className="text-2xl font-bold text-indigo-600">EventNest</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" as="a" href="/login">
                  Đăng nhập
                </Button>
                <Button variant="primary" size="sm" as="a" href="/register">
                  Đăng ký
                </Button>
              </>
            ) : (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <UserCircleIcon className="h-7 w-7 text-gray-500" />
                  <span className="font-medium text-gray-700">Xin chào, John</span>
                </Button>
                {/* Dropdown menu cho người dùng đã đăng nhập */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Hồ sơ của tôi
                  </Link>
                  <Link href="/orders/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Đơn hàng
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Button variant="ghost" size="sm" className="w-full text-left px-4 py-2 !justify-start text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsLoggedIn(false)}>
                    Đăng xuất
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pb-3`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {!isLoggedIn ? (
            <div className="flex px-5 space-x-3">
              <Button variant="ghost" size="md" className="flex-1" as="a" href="/login" onClick={() => setIsOpen(false)}>
                Đăng nhập
              </Button>
              <Button variant="primary" size="md" className="flex-1" as="a" href="/register" onClick={() => setIsOpen(false)}>
                Đăng ký
              </Button>
            </div>
          ) : (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-10 w-10 text-gray-500" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
              </div>
            </div>
          )}
          {isLoggedIn && (
            <div className="mt-3 space-y-1 px-2">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Hồ sơ của tôi
              </Link>
              <Link
                href="/orders/my-orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Đơn hàng
              </Link>
              <Button variant="ghost" size="md" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => { setIsLoggedIn(false); setIsOpen(false); }}>
                Đăng xuất
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};