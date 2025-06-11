import Image from "next/image";
import { Button } from "@/components/common";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Chào mừng đến với EventNest!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Khám phá hàng ngàn sự kiện hấp dẫn, từ âm nhạc, nghệ thuật đến hội thảo công nghệ.
      </p>
      {/* Thêm nội dung trang chủ của bạn tại đây */}
      <img src="/images/hero-banner.jpg" alt="Event Banner" className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sự kiện nổi bật</h2>
      {/* Ví dụ: Hiển thị một số sự kiện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card sự kiện mẫu */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/images/event-placeholder-1.jpg" alt="Event 1" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Hòa Nhạc Mùa Xuân</h3>
            <p className="text-gray-600 text-sm">Ngày: 20/07/2025</p>
            <p className="text-gray-600 text-sm mb-4">Địa điểm: Nhà hát Lớn</p>
            <Button className="w-full" variant="primary">Xem chi tiết</Button>
          </div>
        </div>
        {/* Thêm các card sự kiện khác */}
      </div>
      <div className="mt-10">
        <Link href="/events">
          <Button variant="outline" size="lg">Xem tất cả sự kiện</Button>
        </Link>
      </div>
    </div>
  );
} 