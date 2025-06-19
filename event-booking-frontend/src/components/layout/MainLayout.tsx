// src/components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header';
import { Navbar } from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (Optional: nếu bạn có một banner riêng biệt) */}
      <Header />
      {/* Navbar (Thanh điều hướng chính) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};