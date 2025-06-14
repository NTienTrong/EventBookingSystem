import { User } from './user';

export interface AuthUser {
  user: User;
  token: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
} 