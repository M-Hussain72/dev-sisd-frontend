import { createContext, useContext, useState } from 'react';
import { getAuthToken, setAuthToken } from '../utils/auth.ts';
import React from 'react';
import authHttp, { loginPropType, registerPropType } from '../http/authHttp.ts';
import userHttp, { userApiType } from '../http/userHttp.ts';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-router';

export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  isEmailVerified: boolean;
  phoneNo: string | null;
  profileImage: string | null;
}

export interface AuthContextType {
  isAuthenticate: boolean;
  user?: User | null;
  logOut: () => void;
  autoLogout: () => void;
  login: ({ fromData }: loginPropType) => Promise<void>;
  register: ({ fromData }: registerPropType) => Promise<void>;
  getUser: ({ authAxios }: userApiType) => Promise<User>;
  googleLogin: ({ token }: { token: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const token = getAuthToken();

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(!!token);

  function logOut() {
    setUser(null);
    setIsAuthenticate(false);
    localStorage.removeItem('token');
    window.location.replace(`/?notify=logout-success`);
  }

  function autoLogout() {
    setUser(null);
    setIsAuthenticate(false);
    localStorage.removeItem('token');
    window.location.replace(`/?notify=section-expire`);
  }

  async function login({ fromData }: loginPropType) {
    try {
      const res = await authHttp.loginUser({ fromData });
      setAuthToken(res.data.token);
      setIsAuthenticate(true);
      setUser(res.data.user);

      return;
    } catch (error) {
      throw error;
    }
  }

  async function googleLogin({ token }: { token: string }) {
    try {
      const res = await authHttp.googleLoginUser({ token });
      setAuthToken(res.data.token);
      setIsAuthenticate(true);
      setUser(res.data.user);
      return;
    } catch (error) {
      throw error;
    }
  }

  async function register({ fromData }: registerPropType) {
    try {
      const res = await authHttp.registerUser({ fromData });
      setAuthToken(res.data.token);
      setIsAuthenticate(true);
      setUser(res.data.user);
      return;
    } catch (error) {
      throw error;
    }
  }

  async function getUser({ authAxios }: userApiType): Promise<User> {
    try {
      const res = await userHttp.getUserApi({ authAxios });
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      // logOut();
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticate, user, logOut, login, register, getUser, googleLogin, autoLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
