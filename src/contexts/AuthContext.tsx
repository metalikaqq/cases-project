'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  AuthContextType,
  AuthState,
  LoginRequest,
  RegisterRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  ChangePasswordRequest,
  AuthResponse,
  LoginResponse,
  RegisterResponse,
  VerifyEmailResponse,
  PasswordResetResponse,
  User
} from '@/types/auth';
import * as authApi from '@/api/routes/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Додаємо Map для відстеження активних запитів верифікації
  const [activeVerifications, setActiveVerifications] = useState<Map<string, Promise<any>>>(new Map());

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);

          // Verify token is still valid by fetching profile
          try {
            const profileResponse = await authApi.getProfile();
            if (profileResponse.success && profileResponse.data) {
              setAuthState({
                user: profileResponse.data,
                token,
                isLoading: false,
                isAuthenticated: true,
              });
              // Update stored user data
              localStorage.setItem('user', JSON.stringify(profileResponse.data));
              return;
            }
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      }

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<AuthResponse<LoginResponse>> => {
    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        const { access_token, user } = response.data;

        // Store token and user data
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        setAuthState({
          user,
          token: access_token,
          isLoading: false,
          isAuthenticated: true,
        });
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest): Promise<AuthResponse<RegisterResponse>> => {
    try {
      const response = await authApi.register(data);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const verifyEmail = async (token: string): Promise<AuthResponse<VerifyEmailResponse>> => {
    // Перевіряємо чи вже є активний запит для цього токена
    if (activeVerifications.has(token)) {
      console.log('🔄 Using existing verification request for token:', token);
      return activeVerifications.get(token)!;
    }

    const verificationPromise = (async () => {
      try {
        console.log('🔑 AuthContext: Starting new verification request for token:', token);
        const response = await authApi.verifyEmail({ token });
        console.log('📨 AuthContext: Verification API response:', response);

        if (response.success && response.data) {
          const { access_token, user } = response.data;
          console.log('🎉 AuthContext: Verification successful, setting user:', user);

          // Store token and user data
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('user', JSON.stringify(user));

          setAuthState({
            user,
            token: access_token,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          console.log('⚠️ AuthContext: Verification failed with response:', response);
        }

        return response;
      } catch (error) {
        console.error('Email verification error:', error);
        throw error;
      } finally {
        // Видаляємо з активних запитів після завершення
        setActiveVerifications(prev => {
          const newMap = new Map(prev);
          newMap.delete(token);
          return newMap;
        });
      }
    })();

    // Додаємо до активних запитів
    setActiveVerifications(prev => new Map(prev).set(token, verificationPromise));

    return verificationPromise;
  };

  const resendVerification = async (email: string): Promise<AuthResponse<void>> => {
    try {
      const response = await authApi.resendVerification({ email });
      return response;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string): Promise<AuthResponse<PasswordResetResponse>> => {
    try {
      const response = await authApi.requestPasswordReset({ email });
      return response;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  };

  const confirmPasswordReset = async (data: PasswordResetConfirmRequest): Promise<AuthResponse<void>> => {
    try {
      const response = await authApi.confirmPasswordReset(data);
      return response;
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordRequest): Promise<AuthResponse<void>> => {
    try {
      const response = await authApi.changePassword(data);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const response = await authApi.getProfile();
      if (response.success && response.data) {
        const updatedUser = response.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
        }));
      }
    } catch (error) {
      console.error('Refresh profile error:', error);
      // If profile refresh fails, user might need to re-authenticate
      logout();
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    verifyEmail,
    resendVerification,
    requestPasswordReset,
    confirmPasswordReset,
    changePassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
