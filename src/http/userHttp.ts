import { AxiosInstance } from 'axios';
import { getUserId } from '../utils/auth';
import { User } from '../context/AuthContext';
import config from '../utils/config';

export interface userApiType {
  authAxios: AxiosInstance;
}

async function getUserApi({ authAxios }: userApiType) {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/auth/profile`);
    return res;
  } catch (error: any) {
    const err = new Error('user Not Found');
    throw err;
  }
}

export default {
  getUserApi,
};
