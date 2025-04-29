import axios from 'axios';
import config from '../utils/config';
import { BlogDetailIn, BlogsIn } from '../interface/blogInterface';

async function getBlogs(): Promise<BlogsIn[]> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/blog`);
    return res.data.blogs;
  } catch (error: any) {
    const err = new Error('Blogs Not Found');
    throw err;
  }
}

async function getBlogBySlug({ slug }: { slug: string }): Promise<BlogDetailIn> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/blog/slug/${slug}`);
    return res.data.blogs;
  } catch (error: any) {
    const err = new Error('Blogs Not Found');
    err.message = error.message || 'Blogs Not Found';
    throw err;
  }
}

export default {
  getBlogs,
  getBlogBySlug,
};
