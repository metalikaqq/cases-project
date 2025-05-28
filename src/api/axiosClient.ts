import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', // Use environment variable or fallback
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally set up interceptors
axiosClient.interceptors.request.use((config) => {
  // Add authentication tokens if needed
  return config;
});

export default axiosClient;
