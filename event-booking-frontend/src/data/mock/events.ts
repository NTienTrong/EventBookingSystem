export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  organizer: string;
  totalTickets: number;
  availableTickets: number;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Lễ hội âm nhạc Hà Nội 2024',
    description: `Đêm nhạc hoành tráng với sự góp mặt của nhiều ca sĩ nổi tiếng và các ban nhạc underground đình đám.

Chương trình bao gồm:
- Các tiết mục biểu diễn từ các nghệ sĩ hàng đầu
- Khu vực ẩm thực đa dạng
- Khu vực trưng bày và hoạt động tương tác
- Khu vực nghỉ ngơi và giải trí

Đặc biệt:
- Quà tặng độc quyền cho 100 người đặt vé đầu tiên
- Cơ hội giao lưu với nghệ sĩ
- Khu vực chụp ảnh chuyên nghiệp`,
    image: '/images/events/music-festival.jpg',
    date: '2024-04-15',
    time: '18:00',
    location: 'Sân vận động Mỹ Đình, Hà Nội',
    price: 500000,
    category: 'Âm nhạc',
    organizer: 'Công ty Giải trí ABC',
    totalTickets: 1000,
    availableTickets: 750,
  },
  {
    id: '2',
    title: 'Workshop Nhiếp ảnh cơ bản',
    description: `Khóa học thực hành về nhiếp ảnh cơ bản dành cho người mới bắt đầu, được hướng dẫn bởi các nhiếp ảnh gia chuyên nghiệp.

Nội dung khóa học:
- Các nguyên lý cơ bản về nhiếp ảnh
- Kỹ thuật chụp ảnh trong các điều kiện ánh sáng khác nhau
- Cách sử dụng máy ảnh DSLR và các thiết bị phụ trợ
- Thực hành chụp ảnh với model chuyên nghiệp

Học viên sẽ được:
- Cấp chứng chỉ hoàn thành khóa học
- Tặng bộ tài liệu học tập
- Tham gia group chia sẻ kinh nghiệm
- Cơ hội thực tập tại các studio lớn`,
    image: '/images/events/photo-workshop.jpg',
    date: '2024-04-20',
    time: '09:00',
    location: 'Studio ABC, Quận 1, TP.HCM',
    price: 1200000,
    category: 'Giáo dục',
    organizer: 'CLB Nhiếp ảnh Sài Gòn',
    totalTickets: 30,
    availableTickets: 15,
  },
  {
    id: '3',
    title: 'Giải chạy Marathon Đà Nẵng',
    description: `Sự kiện thể thao thường niên quy tụ hàng nghìn vận động viên trong và ngoài nước.

Các cự ly thi đấu:
- Full Marathon (42.195km)
- Half Marathon (21.1km)
- 10km
- 5km (Phần thi dành cho gia đình)

Lộ trình:
- Xuất phát từ bãi biển Mỹ Khê
- Chạy dọc theo bờ biển
- Qua cầu Rồng, cầu Thuận Phước
- Về đích tại công viên Biển Đông

Giải thưởng:
- Tổng giải thưởng lên đến 500 triệu đồng
- Huy chương cho người về đích
- Áo đấu cao cấp
- Chip timing chuyên nghiệp`,
    image: '/images/events/marathon.jpg',
    date: '2024-05-01',
    time: '05:00',
    location: 'Bãi biển Mỹ Khê, Đà Nẵng',
    price: 800000,
    category: 'Thể thao',
    organizer: 'Sở Văn hóa và Thể thao TP. Đà Nẵng',
    totalTickets: 5000,
    availableTickets: 3200,
  },
  {
    id: '4',
    title: 'Triển lãm Công nghệ 2024',
    description: `Triển lãm công nghệ lớn nhất Việt Nam với sự tham gia của các thương hiệu công nghệ hàng đầu.

Các khu vực trưng bày:
- Smartphone và thiết bị di động
- Laptop và máy tính
- Gaming Gear
- Smart Home
- Robotics và AI
- Startup Innovation

Hoạt động:
- Demo sản phẩm mới
- Workshop công nghệ
- Giao lưu với chuyên gia
- Game và quà tặng công nghệ`,
    image: '/images/events/tech-expo.jpg',
    date: '2024-05-15',
    time: '09:00',
    location: 'Trung tâm Hội chợ và Triển lãm Sài Gòn (SECC)',
    price: 200000,
    category: 'Công nghệ',
    organizer: 'Tech Media Corp',
    totalTickets: 2000,
    availableTickets: 1800,
  },
  {
    id: '5',
    title: 'Lễ hội Ẩm thực Quốc tế',
    description: `Trải nghiệm hương vị ẩm thực từ khắp nơi trên thế giới ngay tại Hà Nội.

Các gian hàng:
- Ẩm thực Á Đông
- Ẩm thực Âu - Mỹ
- Ẩm thực Trung Đông
- Bar và Cocktail
- Khu vực đồ ngọt

Hoạt động:
- Show nấu ăn trực tiếp
- Workshop ẩm thực
- Cuộc thi đầu bếp
- Âm nhạc sống
- Các trò chơi và quà tặng`,
    image: '/images/events/food-festival.jpg',
    date: '2024-06-01',
    time: '10:00',
    location: 'Công viên Thống Nhất, Hà Nội',
    price: 350000,
    category: 'Ẩm thực',
    organizer: 'Hiệp hội Ẩm thực Việt Nam',
    totalTickets: 3000,
    availableTickets: 2500,
  }
]; 