import axios, { AxiosInstance } from 'axios';
import { CategoryIn } from '../interface/courseInterface';
import { CartIn, CartItemIn } from '../interface/cartInterface';
import config from '../utils/config';

async function addCartItem({ courseId, authAxios }: { courseId: string; authAxios: AxiosInstance }) {
  try {
    const res = await authAxios.post(`${config.BASE_URL}/v1/cart/add-item`, {
      courseId,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

async function getCartItem({ authAxios }: { authAxios: AxiosInstance }): Promise<CartIn | undefined> {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/cart`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return;
  }
}

async function removeCartItem({ courseId, authAxios }: { courseId: string; authAxios: AxiosInstance }) {
  try {
    const res = await authAxios.delete(`${config.BASE_URL}/v1/cart/remove/${courseId}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return;
  }
}

export default {
  getCartItem,
  addCartItem,
  removeCartItem,
};
