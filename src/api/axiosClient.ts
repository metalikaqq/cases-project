import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use((config) => {
  // Only add token for client-side requests
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle auth errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Don't redirect to login if we're on email verification pages
      const currentPath = window.location.pathname;
      const isVerificationPage =
        currentPath.includes('/verify-email') ||
        currentPath.includes('/auth/verify-email');

      if (!isVerificationPage) {
        // Token is invalid, clear it and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
