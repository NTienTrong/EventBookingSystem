import axios from 'axios';
import { API_URL } from '@/config';
import { UserDTO, UpdateProfileRequest, ChangePasswordRequest } from '@/types/user';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const customersApi = {
  getProfile: async (): Promise<UserDTO> => {
    const response = await axios.get(`${API_URL}/customers/profile`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserDTO> => {
    const response = await axios.put(`${API_URL}/customers/profile`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/customers/change-password`, data, {
      headers: getAuthHeader(),
    });
  },
}; 