// src/components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-indigo-700 text-white py-2 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <p className="mb-1 sm:mb-0">
          🎉 Ưu đãi đặc biệt: Giảm 10% cho tất cả vé VIP đến hết tuần!
        </p>
        <nav className="space-x-4">
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/support" className="hover:underline">
            Hỗ trợ
          </Link>
        </nav>
      </div>
    </header>
  );
};