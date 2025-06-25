import axios, { AxiosInstance } from 'axios';
import { CourseCardIn, CourseIn, getCoursesIn, LectureIn, LectureProgressPayload } from '../interface/courseInterface';
import { filterIn } from '../interface/filterInterface';
import config from '../utils/config';

async function getCoursesByCategory({
  categorySlug,
  filters,
  paginate,
}: {
  categorySlug: string;
  filters: filterIn | null;
  paginate: { page: string; limit: string } | null;
}): Promise<getCoursesIn> {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/course/category/${categorySlug}`, {
      params: {
        rating: filters?.rating || '',
        totalDuration: filters?.totalDuration?.join('|') || '',
        language: filters?.language?.join('|') || '',
        price: filters?.price?.join('|') || '',
        level: filters?.level?.join('|') || '',
        limit: paginate?.limit,
        page: paginate?.page,
      },
    });
    return { ...res.data, courses: res.data.results.items, category: res.data.results?.category };
  } catch (error: any) {
    const err = new Error('Course  Not Found by this category');
    throw err;
  }
}

async function getCoursesBySearch({
  search,
  filters,
  paginate,
}: {
  search: string;
  filters: filterIn | null;
  paginate: { page: string; limit: string } | null;
}): Promise<getCoursesIn> {
  try {
    const searchQuery = encodeURIComponent(search);
    const res = await axios.get(`${config.BASE_URL}/v1/course/search`, {
      params: {
        search: searchQuery,
        rating: filters?.rating || '',
        totalDuration: filters?.totalDuration?.join('|') || '',
        language: filters?.language?.join('|') || '',
        price: filters?.price?.join('|') || '',
        level: filters?.level?.join('|') || '',
        featured: filters?.featured,
        ...paginate,
      },
    });
    return { ...res.data, courses: res.data.results.items };
  } catch (error: any) {
    const err = new Error('Course  Not Found by this search');
    throw err;
  }
}

async function getCoursesBySuggestion({ search }: { search: string }) {
  try {
    const searchQuery = encodeURIComponent(search);
    const res = await axios.get(`${config.BASE_URL}/v1/course/search/suggestion`, {
      params: {
        search: searchQuery,
      },
    });
    return res.data.course;
  } catch (error: any) {
    const err = new Error('Course  Not Found by this search');
    throw err;
  }
}

async function fetchCourse({ courseSlug, authAxios }: { courseSlug: string; authAxios: AxiosInstance }): Promise<CourseIn> {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/course/slug/${courseSlug}`);
    return res.data.course;
  } catch (error: any) {
    const err = new Error('Course  Not Found');
    throw err;
  }
}

async function getUserLearningCourses({
  authAxios,
}: {
  authAxios: AxiosInstance;
}): Promise<{ course: CourseCardIn; percentageComplete: number; reviewId: string | null; hasReviewed: boolean }[]> {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/user/paid/course`);
    return res.data.course;
  } catch (error: any) {
    const err = new Error('Course  Not Found');
    throw err;
  }
}

async function getCompleteCourse({
  authAxios,
}: {
  authAxios: AxiosInstance;
}): Promise<{ course: CourseCardIn; percentageComplete: number; reviewId: string | null; hasReviewed: boolean }[]> {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/user/complete/course`);
    return res.data.course;
  } catch (error: any) {
    const err = new Error('Course  Not Found');
    throw err;
  }
}

async function getPreviewOfCourse({ courseId }: { courseId: string }) {
  try {
    const res = await axios.get(`${config.BASE_URL}/v1/course/preview/${courseId}`);

    return res.data.coursePreview;
  } catch (error: any) {
    const err = new Error('Course Preview Not Found ');
    throw err;
  }
}

async function fetchLecture({
  courseSlug,
  sectionId,
  lectureId,
  authAxios,
}: {
  courseSlug: string;
  sectionId: string;
  lectureId: string;
  authAxios: AxiosInstance;
}): Promise<LectureIn> {
  try {
    const res = await authAxios.get(`${config.BASE_URL}/v1/user/${courseSlug}/${sectionId}/${lectureId}`);
    return res.data;
  } catch (error: any) {
    const err = new Error(' Lecture Not Found');
    throw err;
  }
}

async function setLectureProgress({
  courseSlug,
  lectureId,
  authAxios,
  lastViewTime,
  userAnswers,
  lectureType,
  completed,
  assignment,
}: LectureProgressPayload) {
  try {
    const requestData = {
      completed,
      type: lectureType,
      lectureId,
      ...(lastViewTime ? { last_watched_second: lastViewTime } : {}),
      ...(userAnswers ? { userAnswers } : {}),
      ...(assignment
        ? { assignment: { startedAt: assignment.startedAt, ...(assignment.fileUrl ? { fileUrl: assignment.fileUrl } : {}) } }
        : {}),
    };

    const res = await authAxios.post(`${config.BASE_URL}/v1/user/${courseSlug}/${lectureId}`, requestData);
    return res.data;
  } catch (error: any) {
    const err = new Error(' Lecture Not Found');
    throw err;
  }
}

async function uploadAssignment({
  file,
  courseSlug,
  lectureId,
  authAxios,
}: {
  file: File;
  courseSlug: string;
  lectureId: string;
  authAxios: AxiosInstance;
}) {
  try {
    const fileName = file.name;
    const res = await authAxios.post(`${config.BASE_URL}/v1/file/upload/user-assignment/url`, {
      courseSlug,
      lectureId,
      fileName,
      contentType: file.type,
    });
    try {
      await axios.put(res.data?.putUrl, file);
      return { key: res.data?.path };
    } catch (error) {
      const err = new Error(' File Not Upload!');
      throw err;
    }
    // return res;
  } catch (error) {
    const err = new Error(' File Uploading issue!');
    throw err;
  }
}

export {
  getCoursesByCategory,
  fetchCourse,
  getPreviewOfCourse,
  fetchLecture,
  setLectureProgress,
  getCoursesBySearch,
  getUserLearningCourses,
  getCompleteCourse,
  getCoursesBySuggestion,
  uploadAssignment,
};
