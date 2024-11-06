import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL from environment variables
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
