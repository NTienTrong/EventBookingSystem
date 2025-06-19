export interface UserDTO {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    role: string;
}

export interface UpdateProfileRequest {
    fullName: string;
    phoneNumber: string;
    address?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
} 