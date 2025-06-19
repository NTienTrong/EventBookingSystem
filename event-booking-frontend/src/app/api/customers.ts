import axios from 'axios';
import { UserDTO } from '../types/user';
import { UpdateProfileRequest, ChangePasswordRequest } from '../types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const getProfile = async (): Promise<UserDTO> => {
    const response = await axios.get(`${API_URL}/customers/profile`);
    return response.data;
};

export const updateProfile = async (data: UpdateProfileRequest): Promise<UserDTO> => {
    const response = await axios.put(`${API_URL}/customers/profile`, data);
    return response.data;
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    await axios.post(`${API_URL}/customers/change-password`, data);
}; 