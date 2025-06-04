import { useState } from 'react';
import axiosClient from '@/api/axiosClient';

export interface EmailData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
  selectedValue?: string;
}

export interface UseEmailSendReturn {
  sendEmail: (data: EmailData) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useEmailSend = (): UseEmailSendReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: EmailData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending email data:', data); // Debug log
      console.log('Request URL:', '/api/send-email'); // Debug log
      const response = await axiosClient.post('/api/send-email', data);
      console.log('Response:', response.data); // Debug log

      return true;
    } catch (err: any) {
      console.error('Email send error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data
        }
      });
      const errorMessage = err.response?.data?.message || 'Failed to send email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    sendEmail,
    isLoading,
    error,
    clearError,
  };
};

export default useEmailSend;