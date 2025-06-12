import axios from 'axios';
import { CategoryIn } from '../interface/courseInterface';
import config from '../utils/config';
async function getCategories(): Promise<CategoryIn[]> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/category`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

async function getBoardSelectedCategories(): Promise<CategoryIn[]> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/category/board-select`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

async function getDiverseCourseCategory(): Promise<CategoryIn[]> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/category/feature-select`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default {
  getCategories,
  getBoardSelectedCategories,
  getDiverseCourseCategory,
};
