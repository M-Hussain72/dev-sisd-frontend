import axios, { AxiosInstance } from 'axios';
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
    // while (true);
    return res;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Oops! Failed to Login');
    err.message = error.response ? error.response.data?.message : 'An unexpected error occurred. Please try again later.';
    throw err;
  }
}

async function googleLoginUser({ token }: { token: string }) {
  console.log('call it google for login');
  try {
    const res = await axios.post('http://localhost:3000/v1/auth/google', { token });
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Oops! Failed to Login');
    err.message = error.response ? error.response.data?.message : 'An unexpected error occurred. Please try again later.';
    throw err.message;
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
    console.log(res.data);
    setAuthToken(res.data.token);

    return res.data.token;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Section is expire');
    err.message = error.response.data?.message || 'Section is expire!';
    throw err;
  }
}

async function resetpassword({ token, password }: { token: string; password: string }) {
  try {
    await axios.post(`http://localhost:3000/v1/auth/reset-password`, { password }, { params: { token } });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Reset Password fail!');
    err.message = error.response.data?.message || 'Reset Password fail!';
    throw err;
  }
}

async function forgetPassword({ email }: { email: string }) {
  try {
    await axios.post(`http://localhost:3000/v1/auth/forgot-password`, { email });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Failed to send reset link.');
    err.message = error.response.data?.message || 'Failed to send reset link.';
    throw err;
  }
}

async function sendVerifyEmail({ email, authAxios }: { email: string; authAxios: AxiosInstance }) {
  try {
    await authAxios.post(`http://localhost:3000/v1/auth/send-verification-email`, { email });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Failed to send Verify link.');
    err.message = error.response.data?.message || 'Failed to send Verify link.';
    throw err;
  }
}

async function verifyEmail({ token }: { token: string }) {
  console.log(token);
  try {
    await axios.post(`http://localhost:3000/v1/auth/verify-email`, {}, { params: { token } });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Verify Email fail!');
    err.message = error.response.data?.message || 'Verify Email fail!';
    throw err;
  }
}

export default {
  loginUser,
  registerUser,
  refreshTokens,
  googleLoginUser,
  resetpassword,
  forgetPassword,
  sendVerifyEmail,
  verifyEmail,
};
