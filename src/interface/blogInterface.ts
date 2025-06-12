export interface BlogsIn {
  id: string;
  slug: string;
  author: string;
  title: string;
  created_at: Date;
  poster: string;
}

export interface getBlogsIn {
  pagination: { page: number; limit: number; totalPages: number; totalResults: number };
  blogs: BlogsIn[];
}

export interface BlogDetailIn {
  id: string;
  slug: string;
  author: string;
  title: string;
  created_at: Date;
  content: string;
  poster: string;
}
