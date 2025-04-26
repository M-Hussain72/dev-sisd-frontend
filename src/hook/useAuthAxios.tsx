import { useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import authHttp from '../http/authHttp';
import { useAuth } from '../context/AuthContext';

const useAuthAxios = () => {
  const { autoLogout } = useAuth();
  const axiosInstance = useRef(axios.create());
  const logoutRef = useRef(autoLogout);

  // Update refs when dependencies change
  useEffect(() => {
    logoutRef.current = autoLogout;
  }, [autoLogout]);

  useEffect(() => {
    const instance = axiosInstance.current;

    // Request Interceptor
    const reqInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token?.access?.token) {
          config.headers.Authorization = `Bearer ${token.access.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor
    const resInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await authHttp.refreshTokens();
            return instance(originalRequest);
          } catch (err) {
            logoutRef.current(); // Use ref to avoid stale closure
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      },
    );

    // Cleanup Interceptors
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, []); // Empty dependency array = setup once

  return axiosInstance.current;
};

export default useAuthAxios;
