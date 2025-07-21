import FeedBackCard from './FeedBackCard';
import { useDisclosure } from '@mantine/hooks';
import FeedBackModal from './FeedBackaModal';
import { useQuery } from '@tanstack/react-query';
import reviewHttp from '../../http/reviewHttp';

export default function FeedBack({ courseId, rating }: { courseId: string; rating: number }) {
  const [opened, { close, open }] = useDisclosure(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allReview', courseId],
    queryFn: () => reviewHttp.getCourseReviews({ courseId, paginate: { page: '1', limit: '5' }, rating: null }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <>
      <FeedBackModal opened={opened} close={close} courseId={courseId} />
      <h1 className="text-[28px] sm:text-[34px] font-semibold ">Feedback</h1>
      {data && data.reviews?.length > 0 && (
        <span className=" text-lg text-[#626465] mt-3">
          {rating.toFixed(1) || 0.0} course rating <span className="text-3xl">.</span> {data?.pagination.totalResults || 0}{' '}
          rating & reviews
        </span>
      )}
      <ul className=" mt-4 space-y-6 ">
        {data && data.reviews?.length > 0 ? (
          data.reviews.map((review, index) => (
            <FeedBackCard
              key={index}
              name={review?.user?.name || ''}
              iat={review?.created_at}
              rating={review?.rating}
              message={review?.comment}
              image={review?.user?.profileImage || null}
            />
          ))
        ) : (
          <li className=" mb-10 text-lg text-themeGray6">
            There’s not enough feedback for this course yet. Reviews will appear here once available!
          </li>
        )}
      </ul>
      {data && data.pagination?.totalPages > 1 && (
        <button onClick={open} className=" text-themeBlue hover:underline font-medium mt-12">
          Show All Reviews
        </button>
      )}
    </>
  );
}
