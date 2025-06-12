export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  time: string;
  location: string;
  quantity: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  bookingTime: string;
  tickets: {
    id: string;
    type: string;
    seat: string;
    price: number;
  }[];
  paymentMethod: string;
  paymentStatus: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const bookings: Booking[] = [
  {
    id: '1',
    eventId: '1',
    eventTitle: 'Lễ hội âm nhạc Hà Nội 2024',
    eventImage: '/images/events/music-festival.jpg',
    date: '2024-04-15',
    time: '18:00',
    location: 'Sân vận động Mỹ Đình, Hà Nội',
    quantity: 2,
    totalPrice: 1000000,
    status: 'confirmed',
    bookingDate: '2024-03-01',
    bookingTime: '14:30',
    tickets: [
      {
        id: 'T1',
        type: 'VIP',
        seat: 'A12',
        price: 500000,
      },
      {
        id: 'T2',
        type: 'VIP',
        seat: 'A13',
        price: 500000,
      },
    ],
    paymentMethod: 'Thẻ tín dụng',
    paymentStatus: 'Đã thanh toán',
    customerInfo: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
    },
  },
  {
    id: '2',
    eventId: '2',
    eventTitle: 'Workshop Nhiếp ảnh cơ bản',
    eventImage: '/images/events/photo-workshop.jpg',
    date: '2024-04-20',
    time: '09:00',
    location: 'Studio ABC, Quận 1, TP.HCM',
    quantity: 1,
    totalPrice: 1200000,
    status: 'pending',
    bookingDate: '2024-03-05',
    bookingTime: '10:15',
    tickets: [
      {
        id: 'T3',
        type: 'Standard',
        seat: 'B5',
        price: 1200000,
      },
    ],
    paymentMethod: 'Chuyển khoản ngân hàng',
    paymentStatus: 'Chờ thanh toán',
    customerInfo: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
    },
  },
  {
    id: '3',
    eventId: '3',
    eventTitle: 'Giải chạy Marathon Đà Nẵng',
    eventImage: '/images/events/marathon.jpg',
    date: '2024-05-01',
    time: '05:00',
    location: 'Bãi biển Mỹ Khê, Đà Nẵng',
    quantity: 1,
    totalPrice: 800000,
    status: 'cancelled',
    bookingDate: '2024-02-15',
    bookingTime: '08:45',
    tickets: [
      {
        id: 'T4',
        type: 'Full Marathon',
        seat: 'BIB-1234',
        price: 800000,
      },
    ],
    paymentMethod: 'Ví điện tử MoMo',
    paymentStatus: 'Đã hoàn tiền',
    customerInfo: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
    },
  },
]; 