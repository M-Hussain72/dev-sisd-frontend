import axios from 'axios';
import { User } from '../context/AuthContext.tsx';
import { getAuthToken, setAuthToken } from '../utils/auth.ts';

export interface registerPropType {
  fromData: { name: string; email: string; password: string };
}

async function registerUser({ fromData }: registerPropType) {
  try {
    const res = await axios.post('http://localhost:3000/v1/auth/register', fromData);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Oops! Failed to Register');
    err.message = error?.response?.data?.message || 'An unexpected error occurred. Please try again later.';
    throw err;
  }
}

export interface loginPropType {
  fromData: { email: string; password: string };
}

async function loginUser({ fromData }: loginPropType) {
  try {
    const res = await axios.post('http://localhost:3000/v1/auth/login', fromData);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Oops! Failed to Login');
    err.message = error.response ? error.response.data?.message : 'An unexpected error occurred. Please try again later.';
    throw err;
  }
}

async function refreshTokens() {
  try {
    const token = getAuthToken();
    if (token === null) {
      console.log('from refresh token token check falid');
      const err = new Error('Section is expire');
      err.message = 'Section is expire!';
      throw err;
    }
    const res = await axios.post(`http://localhost:3000/v1/auth/refresh-tokens`, { refreshToken: token.refresh.token });
    setAuthToken(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Section is expire');
    err.message = error.response.data?.message || 'Section is expire!';
    throw err;
  }
}

export default {
  loginUser,
  registerUser,
  refreshTokens,
};
