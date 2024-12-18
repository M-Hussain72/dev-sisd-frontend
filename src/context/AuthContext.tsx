import { createContext, useContext, useState } from 'react';
import { getAuthToken, setAuthToken } from '../utils/auth.ts';
import React from 'react';
import authHttp, { loginPropType, registerPropType } from '../http/authHttp.ts';
import userHttp, { userApiType } from '../http/userHttp.ts';

export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  isEmailVerified: boolean;
}

export interface AuthContextType {
  isAuthenticate: boolean;
  user?: User | null;
  logOut: () => void;
  login: ({ fromData }: loginPropType) => Promise<void>;
  register: ({ fromData }: registerPropType) => Promise<void>;
  getUser: ({ authAxios }: userApiType) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>();

  const token = getAuthToken();
  let isAuthenticate = !!token;
  console.log('isAuthentic from : ');
  console.log(isAuthenticate);

  function logOut() {
    setUser(null);
    isAuthenticate = false;
    localStorage.removeItem('token');
    console.log('log out');
    window.location.replace('/');
  }

  async function login({ fromData }: loginPropType) {
    try {
      const res = await authHttp.loginUser({ fromData });
      setAuthToken(res.data.tokens);
      setUser(res.data.user);
      return;
    } catch (error) {
      throw error;
    }
  }

  async function register({ fromData }: registerPropType) {
    try {
      const res = await authHttp.registerUser({ fromData });
      setAuthToken(res.data.tokens);
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
      logOut();
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticate, user, logOut, login, register, getUser }}>
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
