import { Event } from '@/types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Music Festival 2024',
    description: 'Đại nhạc hội âm nhạc lớn nhất năm 2024',
    address: 'Sân vận động Mỹ Đình',
    location: 'Hà Nội',
    startDate: '2024-05-15T18:00:00Z',
    endDate: '2024-05-16T23:00:00Z',
    category: 'music',
    image: '/images/events/music-festival.jpg',
    status: 'upcoming',
    organizer: {
      id: 'org1',
      name: 'VieEvents',
      email: 'contact@vievents.com',
      phone: '0901234567'
    },
    tickets: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    description: 'Hội nghị công nghệ lớn nhất Việt Nam',
    address: 'Trung tâm Hội nghị Quốc gia',
    location: 'Hà Nội',
    startDate: '2024-06-20T08:00:00Z',
    endDate: '2024-06-22T17:00:00Z',
    category: 'technology',
    image: '/images/events/tech-conference.jpg',
    status: 'upcoming',
    organizer: {
      id: 'org2',
      name: 'TechViet',
      email: 'events@techviet.vn',
      phone: '0912345678'
    },
    tickets: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Food & Wine Festival',
    description: 'Lễ hội ẩm thực và rượu vang',
    address: 'Nhà thi đấu Phú Thọ',
    location: 'Hồ Chí Minh',
    startDate: '2024-04-10T10:00:00Z',
    endDate: '2024-04-12T22:00:00Z',
    category: 'food',
    image: '/images/events/food-festival.jpg',
    status: 'ongoing',
    organizer: {
      id: 'org3',
      name: 'FoodFest',
      email: 'info@foodfest.vn',
      phone: '0923456789'
    },
    tickets: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Art Exhibition 2024',
    description: 'Triển lãm nghệ thuật đương đại',
    address: 'Bảo tàng Mỹ thuật Việt Nam',
    location: 'Hà Nội',
    startDate: '2024-03-01T09:00:00Z',
    endDate: '2024-03-15T21:00:00Z',
    category: 'arts',
    image: '/images/events/art-exhibition.jpg',
    status: 'completed',
    organizer: {
      id: 'org4',
      name: 'ArtSpace',
      email: 'contact@artspace.vn',
      phone: '0934567890'
    },
    tickets: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Business Summit 2024',
    description: 'Hội nghị thượng đỉnh doanh nghiệp',
    address: 'JW Marriott Hotel',
    location: 'Hồ Chí Minh',
    startDate: '2024-07-05T08:30:00Z',
    endDate: '2024-07-06T17:30:00Z',
    category: 'business',
    image: '/images/events/business-summit.jpg',
    status: 'upcoming',
    organizer: {
      id: 'org5',
      name: 'BizConnect',
      email: 'events@bizconnect.vn',
      phone: '0945678901'
    },
    tickets: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
]; 