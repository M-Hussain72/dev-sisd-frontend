import axios, { AxiosInstance } from 'axios';
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

async function assignCourse({ authAxios, courseId }: { authAxios: AxiosInstance; courseId: string }) {
  try {
    const res = await authAxios.post(`${config.BASE_URL}/v1/user/assign/free`, { courseId });
    return res;
  } catch (error: any) {
    const err = new Error('Course Not Assign');
    err.message = error.response.message;
    throw err;
  }
}

async function sendContactEmail({
  message,
  topic,
  email,
  name,
}: {
  message: string;
  topic: string;
  email: string;
  name: string;
}) {
  try {
    const res = await axios.post(`${config.BASE_URL}/v1/user/email`, { message, topic, email, name });
    return;
  } catch (error: any) {
    const err = new Error('Fail sending email ');
    err.message = error.response.message;
    throw err;
  }
}

export default {
  getUserApi,
  assignCourse,
  sendContactEmail,
};
