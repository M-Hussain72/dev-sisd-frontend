export interface CartItemIn {
  course: {
    _id: string;
    poster: string;
    title: string;
    price: number;
    rating: number;
    author: string;
    noOfReviews: number;
    totalVideoDuration: number;
    articleCount: number;
    videoCount: number;
    level: 'all-level' | 'beginner' | 'intermediate' | 'experts';
  };
}

export interface CartIn {
  cart: { id: string; items: CartItemIn[]; total: number };
}
