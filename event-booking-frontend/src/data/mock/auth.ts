import { User } from '@/types/user';
import { mockUsers } from './users';

export interface AuthUser extends User {
  password: string;
}

// Mock users với password
const authUsers: AuthUser[] = [
  {
    ...mockUsers[0],
    password: 'admin123',
  },
  {
    ...mockUsers[1],
    password: 'customer123',
  }
];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock authentication service
export const authService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Giả lập delay của API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = authUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    // Tạo mock token
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Trả về user (không bao gồm password) và token
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  },

  // Register function
  register: async (
    userData: Omit<AuthUser, 'id' | 'role' | 'createdAt' | 'updatedAt'> & { 
      confirmPassword: string;
      name: string;
    }
  ): Promise<AuthResponse> => {
    // Giả lập delay của API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email already exists
    if (authUsers.some((u) => u.email === userData.email)) {
      throw new Error('Email đã được sử dụng');
    }

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }

    // Create new user
    const newUser: AuthUser = {
      id: `${authUsers.length + 1}`,
      fullName: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'customer',
      avatar: '/images/avatar-placeholder.jpg',
      password: userData.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock database
    authUsers.push(newUser);

    // Create mock token
    const token = `mock-token-${newUser.id}-${Date.now()}`;

    // Return user (without password) and token
    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token,
    };
  },

  // Verify token
  verifyToken: async (token: string): Promise<User | null> => {
    // Giả lập delay của API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Parse user ID from token
    const userId = token.split('-')[1];
    const user = authUsers.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};

export const mockCredentials = {
  admin: {
    email: 'admin@eventnest.com',
    password: 'admin123'
  },
  customer: {
    email: 'customer@example.com',
    password: 'customer123'
  }
}; 