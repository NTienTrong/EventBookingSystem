import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log('Request interceptor - Token:', token); // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request headers:', config.headers); // Debug log
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error); // Debug log
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status); // Debug log
    return response;
  },
  async (error) => {
    console.error('Response error:', error.response?.data || error.message);
    
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        Cookies.set('token', accessToken, {
          expires: 7,
          path: '/',
          sameSite: 'lax',
          secure: window.location.protocol === 'https:'
        });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    // If error is 401 and not a refresh token error or refresh token failed
    if (error.response?.status === 401) {
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api; 