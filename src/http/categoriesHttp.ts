import axios from 'axios';
import { CategoryIn } from '../interface/courseInterface';
import config from '../utils/config';
async function getCategories(): Promise<CategoryIn[]> {
  console.log(config.BASE_URL);
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/category`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default {
  getCategories,
};
