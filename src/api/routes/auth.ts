import axios, { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendVerificationRequest,
  PasswordResetRequest,
  PasswordResetResponse,
  PasswordResetConfirmRequest,
  ChangePasswordRequest,
  User,
} from '@/types/auth';

const API_BASE_URL = 'http://localhost:3000';

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse<LoginResponse>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse<RegisterResponse>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const verifyEmail = async (
  data: VerifyEmailRequest
): Promise<AuthResponse<VerifyEmailResponse>> => {
  try {
    console.log('🌐 API: Sending verification request:', data);
    // Create a separate axios instance without auth headers for email verification
    const response = await axios.post(
      `${API_BASE_URL}/auth/verify-email`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('📡 API: Verification response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('💥 API: Verification request failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.log('📋 API: Error response data:', error.response.data);
      return error.response.data;
    }
    throw error;
  }
};

export const resendVerification = async (
  data: ResendVerificationRequest
): Promise<AuthResponse<void>> => {
  try {
    // Create a separate axios instance without auth headers for resend verification
    const response = await axios.post(
      `${API_BASE_URL}/auth/resend-verification`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const requestPasswordReset = async (
  data: PasswordResetRequest
): Promise<AuthResponse<PasswordResetResponse>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/password-reset`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const confirmPasswordReset = async (
  data: PasswordResetConfirmRequest
): Promise<AuthResponse<void>> => {
  try {
    const response = await axiosClient.post(
      // `${API_BASE_URL}/auth/password-reset/confirm`,
      `${API_BASE_URL}/en/auth/password-reset/confirm`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const getProfile = async (): Promise<AuthResponse<User>> => {
  try {
    const response = await axiosClient.get(`${API_BASE_URL}/auth/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<AuthResponse<void>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/change-password`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Legacy exports for backward compatibility
export const signIn = login;
export const signUp = register;
