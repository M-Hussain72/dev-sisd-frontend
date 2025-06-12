import FeedBackCard from './FeedBackCard';
import reviewMan from '../../public/reviewMen.png';
import { Loader, Modal, Rating } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useState } from 'react';
import DrawerComponent from '../LandingPageComponent/DrawerComponent';
import RatingFilter from './RatingFilter';
import Button from '../ui/Button';
import reviewHttp from '../../http/reviewHttp';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export default function FeedBackModal({
  opened,
  courseId,
  close,
}: {
  courseId: string;
  opened: boolean;
  close: () => void;
}) {
  const [selectedRating, setSelectedRating] = useState(0);
  const isMobile = useMediaQuery('(max-width:640px)');
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['courseReviews', courseId, selectedRating],
    queryFn: ({ pageParam = 1 }) =>
      reviewHttp.getCourseReviews({
        courseId,
        paginate: { page: pageParam.toString(), limit: '10' },
        rating: selectedRating > 0 ? selectedRating : null,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  const ModalTitle = (
    <div className=" flex gap-2 items-center">
      {isMobile && (
        <DrawerComponent>
          <div className="min-w-[165px]">
            <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} isMobile={isMobile} />
          </div>
        </DrawerComponent>
      )}
      <h1 className=" text-resHeading font-semibold text-themeBlack">FeedBack</h1>
    </div>
  );

  const reviews = data?.pages.flatMap((p) => p.reviews) || [];

  return (
    <Modal opened={opened} onClose={close} fullScreen={isMobile} size={'85%'} title={ModalTitle}>
      <div className=" w-full  px-5 pb-10 min-h-dvh">
        <div className=" flex  gap-4 mt-4">
          {!isMobile && (
            <div className="min-w-[180px]">
              <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
            </div>
          )}
          <div className=" flex-1">
            <ul className=" w-full  space-y-6 mb-6">
              {reviews.length ? (
                reviews.map((review, index) => (
                  <li key={index} className=" w-full">
                    {' '}
                    <FeedBackCard
                      key={index}
                      name={review?.user?.name || ''}
                      iat={review?.created_at}
                      rating={review?.rating}
                      message={review?.comment}
                      image={review?.user?.profileImage}
                    />
                  </li>
                ))
              ) : isLoading ? (
                <div className=" mt-16 w-fit mx-auto">
                  <Loader size={'lg'} className="" />
                </div>
              ) : (
                <>
                  <li className="w-full py-10 text-center text-themeGray">No reviews found for this course.</li>
                </>
              )}
            </ul>
            {hasNextPage && (
              <div className="flex mt-16 ">
                <button
                  className=" w-full border-[1px] rounded border-themeBlue text-themeBlue hover:bg-blue-50 px-3 py-1"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading…' : 'Show more reviews'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
