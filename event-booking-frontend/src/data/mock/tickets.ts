import { TicketType } from '@/types/ticket';

export const mockTicketTypes: TicketType[] = [
  {
    id: 'TKT001',
    eventId: '1',
    eventName: 'Music Festival 2024',
    name: 'VIP',
    description: 'Vé VIP bao gồm chỗ ngồi hàng đầu và đồ uống miễn phí',
    price: 2000000,
    quantity: 100,
    sold: 45
  },
  {
    id: 'TKT002',
    eventId: '1',
    eventName: 'Music Festival 2024',
    name: 'Standard',
    description: 'Vé thường với chỗ ngồi thoải mái',
    price: 500000,
    quantity: 500,
    sold: 200
  },
  {
    id: '3',
    eventId: '2',
    eventName: 'Tech Conference 2024',
    name: 'Early Bird',
    description: 'Vé ưu đãi sớm',
    price: 1500000,
    quantity: 200,
    sold: 180,
    benefits: [
      'Tài liệu hội thảo',
      'Bữa trưa',
      'Networking session',
      'Quà tặng công nghệ',
    ],
  },
  {
    id: '4',
    eventId: '2',
    eventName: 'Tech Conference 2024',
    name: 'Regular',
    description: 'Vé thường',
    price: 2000000,
    quantity: 300,
    sold: 150,
    benefits: ['Tài liệu hội thảo', 'Bữa trưa', 'Networking session'],
  },
  {
    id: '5',
    eventId: '3',
    eventName: 'Food & Wine Festival',
    name: 'Premium',
    description: 'Trải nghiệm ẩm thực cao cấp',
    price: 1800000,
    quantity: 150,
    sold: 120,
    benefits: [
      'Thử rượu vang không giới hạn',
      'Bữa tối với đầu bếp nổi tiếng',
      'Quà tặng độc quyền',
      'Khu vực VIP',
    ],
  },
]; 