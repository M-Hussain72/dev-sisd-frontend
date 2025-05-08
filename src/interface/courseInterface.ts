import { AxiosInstance } from 'axios';

export interface CourseCardIn {
  poster: string;
  title: string;
  author: string;
  slug: string;
  id: string;
  price: number;
  rating: number;
  noOfReviews: number;
  shortDescription: string;
  totalVideoDuration: number;
  videoCount: number;
  assessmentCount: number;
  articleCount: number;
  discount: number;
  percentageComplete: number;
  hasReviewed: boolean;
  reviewId: string | null;
}

export interface SectionContentIn {
  _id: string;
  title: string;
  type: 'video' | 'assessment' | 'article';
  video: string | null;
  assessment: string | null;
  article: string | null;
  duration: number;
  preview: boolean;
  isCompleted: boolean;
}

export interface ContentIn {
  _id: string;
  sectionTitle: string;
  sectionContent: SectionContentIn[];
}

export interface CourseIn {
  id: string;
  slug: string;
  poster: string;
  title: string;
  shortDescription: string;
  rating: number;
  noOfReviews: number;
  author: string;
  language: string;
  description: string;
  learningOutcomes: string[];
  price: number;
  content: ContentIn[];
  totalVideoDuration: number;
  videoCount: number;
  assessmentCount: number;
  articleCount: number;
  subscribe: boolean;
  level: 'all-level' | 'beginner' | 'intermediate' | 'experts';
}

export interface QuizIn {
  question: string;
  questionType: 'single-choice' | 'multiple-choice';
  options: string[];
  correctOptionsIndex: number[];
}
export interface LectureProgressPayload {
  courseSlug: string;
  lectureId: string;
  authAxios: AxiosInstance;
  lastViewTime: number | null;
  completed: boolean;
  userAnswers: (number | number[])[] | null; // Replace with proper type for answers
  lectureType: 'video' | 'article' | 'assessment';
}
export interface LectureIn {
  lecture: {
    _id: string;
    title: string;
    type: 'video' | 'assessment' | 'article';
    video: string | null;
    assessment: QuizIn[] | null;
    article: string | null;
    duration: number;
    preview: boolean;
  };
  progress: {
    lectureId: string;
    last_watched_second: number;
    completed: boolean;
    quizScore: number | undefined;
    userAnswers: (number | number[])[] | null;
  } | null;
}

export interface CategoryIn {
  onBoard: boolean;
  categoryName: string;
  categorySlug: string;
  id: string;
}

export interface SearchSuggestionIn {
  title: string;
  slug: string;
  type: 'course' | 'category';
}
