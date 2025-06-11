// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
//import { FacebookIcon, TwitterIcon, InstagramIcon } from '@heroicons/react/24/outline'; // Sẽ cần tự tạo hoặc tìm thư viện icon xã hội khác nếu Heroicons không có
const FacebookIconSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.872V14.25h-2.54V11.25h2.54V8.75c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.77-1.63 1.563V11.25h2.77l-.44 3H12v7.622C17.318 21.08 22 16.586 22 12A10 10 0 0012 2z" clipRule="evenodd" />
  </svg>
);
const TwitterIconSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.162 5.657a.896.896 0 00-.396-.532l-1.076-.566c-.32-.169-.69-.24-.954-.24H1.365a.91.91 0 00-.91.91V21.46a.91.91 0 00.91.91h21.037a.91.91 0 00.91-.91V6.52a.91.91 0 00-.203-.863zM15.42 8.358a.91.91 0 00-1.74-.298l-3.322 3.32-1.922-1.922a.91.91 0 00-1.288 1.288l2.566 2.566a.91.91 0 001.288 0l3.966-3.966a.91.91 0 000-1.288z" />
  </svg>
);
const InstagramIconSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.318 6.438a2.531 2.531 0 012.53-2.53h2.304a2.531 2.531 0 012.531 2.53v2.304a2.531 2.531 0 01-2.531 2.53H10.848a2.531 2.531 0 01-2.53-2.53V6.438zM12 11.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" clipRule="evenodd" />
  </svg>
);


export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Slogan */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">EventNest</h3>
            <p className="text-sm">
              Nơi kết nối bạn với những sự kiện độc đáo và đáng nhớ nhất.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FacebookIconSvg className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <TwitterIconSvg className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <InstagramIconSvg className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="hover:text-white transition-colors duration-200">
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-200">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors duration-200">
                  Chính sách hoàn tiền
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
            <address className="not-italic text-sm space-y-2">
              <p>123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh</p>
              <p>Email: <a href="mailto:support@eventnest.com" className="hover:text-white transition-colors duration-200">support@eventnest.com</a></p>
              <p>Điện thoại: <a href="tel:+84123456789" className="hover:text-white transition-colors duration-200">+84 123 456 789</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EventNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};