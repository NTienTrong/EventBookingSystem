import api from './api';
import { User } from '@/types/user';

export const userApi = {
    getAllUsers: () => api.get<User[]>('/users').then(res => res.data),
    getUserById: (id: number) => api.get<User>(`/users/${id}`).then(res => res.data),
    updateUser: (id: number, data: Partial<User>) => api.put<User>(`/users/${id}`, data).then(res => res.data),
    deleteUser: (id: number) => api.delete(`/users/${id}`).then(res => res.data),
    updateUserStatus: (id: number, isActive: boolean) => 
        api.put<User>(`/users/${id}/status`, { active: isActive }).then(res => res.data),
}; 