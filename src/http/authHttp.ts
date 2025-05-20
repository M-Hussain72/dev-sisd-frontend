import axios, { AxiosInstance } from 'axios';
import { User } from '../context/AuthContext.tsx';
import { getAuthToken, setAuthToken } from '../utils/auth.ts';
import config from '../utils/config.ts';

export interface registerPropType {
  fromData: { name: string; email: string; password: string };
}

async function registerUser({ fromData }: registerPropType) {
  try {
    const res = await axios.post(`${config.BASE_URL}/v1/auth/register`, fromData);
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
    const res = await axios.post(`${config.BASE_URL}/v1/auth/login`, fromData);
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
  try {
    const res = await axios.post(`${config.BASE_URL}/v1/auth/google`, { token });
    return res;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Oops! Failed to Login');
    err.message = error.response.data?.message || 'An unexpected error occurred. Please try again later.';
    throw err;
  }
}

async function refreshTokens() {
  try {
    const token = getAuthToken();
    if (token === null) {
      const err = new Error('Section is expire');
      err.message = 'Section is expire!';
      throw err;
    }
    const res = await axios.post(`${config.BASE_URL}/v1/auth/refresh-tokens`, { refreshToken: token.refresh.token });
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
    await axios.post(`${config.BASE_URL}/v1/auth/reset-password`, { password }, { params: { token } });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Reset Password fail!');
    err.message = error.response.data?.message || 'Reset Password fail!';
    throw err;
  }
}

async function forgetPassword({ email, source = 'customer' }: { email: string; source: 'panel' | 'customer' }) {
  try {
    await axios.post(`${config.BASE_URL}/v1/auth/forgot-password`, { email, source });
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
    await authAxios.post(`${config.BASE_URL}/v1/auth/send-verification-email`, { email });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Failed to send Verify link.');
    err.message = error.response.data?.message || 'Failed to send Verify link.';
    throw err;
  }
}

async function verifyEmail({ token }: { token: string }) {
  try {
    await axios.post(`${config.BASE_URL}/v1/auth/verify-email`, {}, { params: { token } });
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
