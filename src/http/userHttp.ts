import { AxiosInstance } from 'axios';
import { getUserId } from '../utils/auth';
import { User } from '../context/AuthContext';

export interface userApiType {
  authAxios: AxiosInstance;
}

async function getUserApi({ authAxios }: userApiType) {
  console.log('getUser api call');
  try {
    const id = getUserId();
    const res = await authAxios.get(`http://localhost:3000/v1/users/${id}`);
    console.log('getUser');
    return res;
  } catch (error: any) {
    const err = new Error('user Not Found');
    throw err;
  }
}

export default {
  getUserApi,
};
