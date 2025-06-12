import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@eventnest.com',
    fullName: 'Admin User',
    phone: '0123456789',
    role: 'admin',
    avatar: '/images/avatars/admin-avatar.png',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'customer@example.com',
    fullName: 'John Doe',
    phone: '0987654321',
    role: 'customer',
    avatar: '/images/avatars/customer-avatar.png',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
]; 