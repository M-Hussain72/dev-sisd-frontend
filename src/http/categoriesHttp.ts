import axios from 'axios';
import { CategoryIn } from '../interface/courseInterface';
async function getCategories(): Promise<CategoryIn[]> {
  try {
    const res = await axios.get(`http://localhost:3000/v1/category`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default {
  getCategories,
};
