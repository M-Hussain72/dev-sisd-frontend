export interface ReviewIn {
  id: string;
  rating: number;
  comment: string;
  user: { profileImage: string | null; name: string | null };
  created_at: Date;
}

export interface getReviewIn {
  pagination: { page: number; limit: number; totalPages: number; totalResults: number };
  reviews: ReviewIn[];
}
