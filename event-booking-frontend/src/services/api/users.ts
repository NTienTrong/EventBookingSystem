import { User, UserFilter } from '@/types/user';
import { api } from './api';

export const usersApi = {
  // Lấy danh sách người dùng (Admin)
  getUsers: async (filter?: UserFilter) => {
    const response = await api.get('/users', { params: filter });
    return response.data;
  },

  // Lấy thông tin người dùng
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id: string, data: Partial<User>) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Xóa người dùng (Admin)
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Cập nhật avatar
  updateAvatar: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Đổi mật khẩu
  changePassword: async (id: string, data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post(`/users/${id}/change-password`, data);
    return response.data;
  },
}; 