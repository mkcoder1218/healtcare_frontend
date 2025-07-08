import api from './api';
import { UserRole } from '../interfaces/index.ts';
import type { User } from '../interfaces/index.ts';

// Type for login/register response
interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    
    // Store token and user in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('User logged in successfully:', data.user);
    }
    
    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
};

// Register user
export const register = async (
  name: string, 
  email: string, 
  password: string,
  role?: UserRole
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password, role });
    
    // Store token and user in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('User registered successfully:', data.user);
    }
    
    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('User logged out');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('Current user from localStorage:', user);
      return user;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  }
  console.log('No user found in localStorage');
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = !!localStorage.getItem('token');
  const user = getCurrentUser();
  console.log('Authentication check - Token exists:', token, 'User exists:', !!user);
  return token && !!user;
};

// Get user profile from API
export const getUserProfile = async (): Promise<{user: User, professionalProfile: any | null}> => {
  try {
    const { data } = await api.get('/auth/profile');
    console.log('User profile fetched from API:', data);
    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
};

// Check if user has specific role
export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  const hasRole = user ? user.role === role : false;
  console.log(`Checking if user has role ${role}:`, hasRole);
  return hasRole;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  return hasRole(UserRole.ADMIN);
};

// Check if user is professional
export const isProfessional = (): boolean => {
  return hasRole(UserRole.PROFESSIONAL);
};

// Handle auth errors
const handleAuthError = (error: any): Error => {
  const errorMessage = 
    error.response?.data?.message || 
    error.message || 
    'Authentication error';
  console.error('Auth error:', errorMessage);
  return new Error(errorMessage);
}; 