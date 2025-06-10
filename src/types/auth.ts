// Authentication types based on the NestJS backend API
export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified?: boolean;
  emailVerifiedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  message: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  access_token: string;
  user: User;
  message: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<AuthResponse<LoginResponse>>;
  register: (data: RegisterRequest) => Promise<AuthResponse<RegisterResponse>>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<AuthResponse<VerifyEmailResponse>>;
  resendVerification: (email: string) => Promise<AuthResponse<void>>;
  requestPasswordReset: (
    email: string
  ) => Promise<AuthResponse<PasswordResetResponse>>;
  confirmPasswordReset: (
    data: PasswordResetConfirmRequest
  ) => Promise<AuthResponse<void>>;
  changePassword: (data: ChangePasswordRequest) => Promise<AuthResponse<void>>;
  refreshProfile: () => Promise<void>;
}
