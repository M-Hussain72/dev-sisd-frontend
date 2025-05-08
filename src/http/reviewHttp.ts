import axios, { AxiosInstance } from 'axios';
import config from '../utils/config';
import { ReviewIn } from '../interface/reviewInterface';

async function addCourseReview({
  courseId,
  rating,
  comment,
  authAxios,
}: {
  authAxios: AxiosInstance;
  courseId: string;
  comment: string | undefined;
  rating: number;
}) {
  try {
    const res = await authAxios.post(`${config.BASE_URL}/v1/course/review`, {
      courseId: courseId,
      rating: rating,
      comment: comment,
    });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Fail to Submit Review ');
    err.message = error.response?.data.message || 'Fail to Submit Review';
    throw err;
  }
}

async function getReviewById({ courseId }: { courseId: string }): Promise<ReviewIn> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/course/review/user/${courseId}`);
    return res.data.review;
  } catch (error: any) {
    const err = new Error('Review Not Found');
    err.message = error.response.data.message || 'Review Not Found';
    throw err;
  }
}

async function updateCourseReview({
  courseId,
  rating,
  comment,
  authAxios,
}: {
  authAxios: AxiosInstance;
  courseId: string;
  comment: string | undefined;
  rating: number;
}) {
  try {
    const res = await authAxios.put(`${config.BASE_URL}/v1/course/review`, {
      courseId: courseId,
      rating: rating,
      comment: comment,
    });
    return;
  } catch (error: any) {
    console.log(error);
    const err = new Error('Fail to update Review ');
    err.message = error.response?.data.message || 'Fail to Update Review';
    throw err;
  }
}

export default {
  addCourseReview,
  getReviewById,
  updateCourseReview,
};
