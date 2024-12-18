import axios from 'axios';

import { getAuthToken } from '../utils/auth';
import authHttp from '../http/authHttp';
const useAuthAxios = () => {
  const axiosApiInstance = axios.create();

  axiosApiInstance.interceptors.request.use(
    async (config) => {
      let token = getAuthToken();
      if (token != null) {
        config.headers.Authorization = `Bearer ${token?.access.token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  // Response interceptor for API calls
  axiosApiInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await authHttp.refreshTokens();
          console.log('originalRequest: ');
          // Retry the original request
          return axiosApiInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosApiInstance;
};

export default useAuthAxios;
