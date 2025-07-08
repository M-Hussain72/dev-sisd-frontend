import axios, { AxiosInstance } from 'axios';
import { getUserId } from '../utils/auth';
import { User } from '../context/AuthContext';
import config from '../utils/config';

export interface userApiType {
  authAxios: AxiosInstance;
}

async function getUserApi({ authAxios }: userApiType) {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/user/profile`);
    return res;
  } catch (error: any) {
    const err = new Error('user Not Found');
    throw err;
  }
}

async function updateUser({
  authAxios,
  email,
  phoneNo,
  profileImage,
  name,
}: {
  authAxios: AxiosInstance;
  email: string | null;
  phoneNo: string | null;
  profileImage: string | null;
  name: string;
}) {
  try {
    const res = await authAxios.put(`${config.BASE_URL}/v1/user/profile`, {
      email,
      phoneNo,
      profileImage,
      name,
    });
    return res;
  } catch (error: any) {
    const err = new Error('user Not Found');
    throw err;
  }
}
async function changePassword({
  authAxios,
  currentPassword,
  newPassword,
}: {
  authAxios: AxiosInstance;
  newPassword: string;
  currentPassword: string;
}) {
  try {
    const res = await authAxios.put(`${config.BASE_URL}/v1/user/change-password`, {
      currentPassword,
      newPassword,
    });
    return res;
  } catch (error: any) {
    const err = new Error('Something went wrong!');
    if (error.response.code == 400 || error.response.code == 404) {
      err.message = error.response.message;
    }
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

async function uploadImage({ file, authAxios }: { file: File; authAxios: AxiosInstance }) {
  // const formData = new FormData();
  // formData.append('file', file);
  try {
    const res = await authAxios.post(`${config.BASE_URL}/v1/file/upload/public/image`, {
      fileName: file.name,
      contentType: file.type,
    });

    const { putUrl: uploadUrl, path: publicUrl } = res.data;

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return { url: publicUrl };
  } catch (error) {
    console.log(error);
    const err = new Error('Uploading issue!');
    throw err;
  }
}

async function deleteImage({ url, authAxios }: { url: string; authAxios: AxiosInstance }) {
  // const formData = new FormData();
  // formData.append('file', file);

  try {
    const encodeUrl = encodeURIComponent(url);
    const res = await authAxios.delete(`${config.BASE_URL}/v1/file/media/image?url=${encodeUrl}`);
    return { url: res?.data?.url };
  } catch (error) {
    console.log(error);
    const err = new Error('Fail Deleting Image!');
    throw err;
  }
}

export default {
  getUserApi,
  assignCourse,
  sendContactEmail,
  changePassword,
  updateUser,
  uploadImage,
  deleteImage,
};
