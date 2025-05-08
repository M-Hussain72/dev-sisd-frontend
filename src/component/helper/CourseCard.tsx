import { Rating } from '@mantine/core';
import starIcon from '../../assets/starIcon.svg';
import defaultImage from '../../assets/defaultCourseImg.png';
import { useNavigate } from '@tanstack/react-router';
import { CourseCardIn } from '../../interface/courseInterface';
import ReviewSubmitModal from './reviewSubmitModal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import reviewHttp from '../../http/reviewHttp';

interface CourseCardProps extends CourseCardIn {
  onClick?: () => void; // Separate onClick prop
  isPaid: boolean;
}

const CourseCard = ({
  id,
  poster,
  title,
  author,
  slug,
  price,
  rating,
  noOfReviews,
  onClick,
  isPaid = false,
  percentageComplete,
  hasReviewed,
  reviewId,
}: CourseCardProps) => {
  const [opened, setOpened] = useState(false);
  const { data: currentReview, isLoading } = useQuery({
    queryKey: ['review', id], // Query key
    queryFn: () => reviewHttp.getReviewById({ courseId: reviewId || '' }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled: opened && hasReviewed,
  });

  return (
    <>
      {isPaid && (
        <ReviewSubmitModal
          courseId={id}
          courseTitle={title}
          opened={opened}
          setOpened={setOpened}
          reviewLoading={isLoading}
          hasReviewed={hasReviewed}
          reviewData={{ rating: currentReview?.rating, comment: currentReview?.comment }}
          // openButton={<span className=" text-themeBlue  font-medium  ">Leave a Rating</span>}
        ></ReviewSubmitModal>
      )}
      <div
        className=" h-full min-h-[300px] flex flex-col group bg-[#FAFAFA] rounded-[10px] shadow-md cursor-pointer"
        onClick={onClick}
      >
        <div className=" aspect-video  overflow-hidden rounded-t-[10px]  ">
          <img
            src={poster ? poster : defaultImage}
            onError={(e) => {
              // Prevent infinite loop in case default image also fails
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultImage;
            }}
            className=" h-full w-full   group-hover:scale-125 transition-all duration-500 cursor-pointer"
          />
        </div>
        <div className="px-4 mt-4">
          <p className=" text-[#2B2B2B]  leading-[20px] font-semibold  min-h-[40px] line-clamp-2 ">{title}</p>

          {!isPaid ? (
            <>
              {rating >= 1 && (
                <div className="flex gap-1 items-center mt-1">
                  <span className=" text-[13px] text-[#7e6525] ">{rating.toFixed(1)}</span>
                  <Rating
                    value={rating}
                    size={'xs'}
                    fractions={2}
                    className="gap-1"
                    color="#FFD05A"
                    emptySymbol={<img src={starIcon} />}
                    readOnly
                  />
                  {/* no of reviews */}
                  {noOfReviews > 10 && <span className=" text-xs text-[#949697] cursor-default">({noOfReviews})</span>}
                </div>
              )}
              <div className="  flex items-center gap-1 mt-1 my-[1px] ">
                <svg
                  width="18"
                  height="18"
                  viewBox="3 0 20 20"
                  fill="none"
                  className="  fill-[#949697] hover:fill-[#307EE1] "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6537 3.43348L11.6554 3.43454L15.7757 5.99203L15.7757 5.99206C16.6765 6.55131 17.0802 7.4904 16.9869 8.39014V11.9559C16.9869 12.2256 16.7557 12.4443 16.4706 12.4443C16.1854 12.4443 15.9543 12.2256 15.9543 11.9559V10.1596C15.8971 10.2014 15.8376 10.2416 15.7757 10.2801L15.7757 10.2801L14.907 10.8193V13.7599C14.907 14.2945 14.6918 14.8204 14.3692 15.2444C14.0466 15.6684 13.5882 16.028 13.0533 16.1967L10.8569 16.8872C10.8553 16.8877 10.8537 16.8882 10.8521 16.8886C10.5925 16.9676 10.2825 17 9.99627 17C9.71052 17 9.40085 16.9677 9.14299 16.8879L9.14078 16.8872L6.9444 16.1967C6.40956 16.028 5.95108 15.6684 5.62853 15.2444C5.30592 14.8204 5.09069 14.2945 5.09069 13.7599L5.09733 10.8161L4.23049 10.2807C2.58984 9.26735 2.58983 6.99826 4.23049 5.98491L8.37316 3.42629L8.3739 3.42583C8.84809 3.13115 9.44488 2.99906 10.0138 3C10.5824 3.00095 11.1793 3.13485 11.6537 3.43348ZM15.9594 7.97951C15.956 8.00198 15.9543 8.02493 15.9543 8.04827V8.33573C15.8965 8.77281 15.6481 9.19076 15.2092 9.46329L15.2092 9.46332L11.0858 12.0228L11.0854 12.023C10.8162 12.1904 10.4287 12.2895 10.0129 12.2895C9.59706 12.2895 9.20957 12.1904 8.94039 12.023L8.93901 12.0222L4.79496 9.46268C3.77845 8.83484 3.77845 7.43077 4.79495 6.80293L8.93901 4.24345L8.94039 4.24259C9.20954 4.07519 9.59682 3.97622 10.012 3.9769C10.4271 3.97759 10.8138 4.07783 11.0826 4.24737L11.0844 4.24845L11.0858 4.24935L15.2092 6.8088C15.6625 7.09028 15.9126 7.5269 15.9594 7.97951ZM13.8745 11.4602V13.7599C13.8745 14.0525 13.7524 14.383 13.5312 14.6737C13.3099 14.9645 13.0181 15.178 12.7269 15.2699L12.7268 15.2699L10.534 15.9592C10.408 15.9972 10.2131 16.0231 9.99627 16.0231C9.77833 16.0231 9.58591 15.9969 9.4651 15.9597L9.46417 15.9594L7.27093 15.2699L7.27065 15.2698C6.97952 15.1779 6.68777 14.9645 6.46657 14.6737C6.24547 14.3831 6.1234 14.0528 6.12327 13.7604V13.7599L6.12847 11.4529L8.37316 12.8393L8.3738 12.8397C8.84798 13.1344 9.44459 13.2664 10.0129 13.2664C10.5814 13.2664 11.1782 13.1343 11.6525 12.8394L13.8745 11.4602Z"
                  />
                </svg>
                <p className="  text-[#949697] text-sm ">{author}</p>
              </div>
              <div className=" mb-4 pb-2">
                {price > 0 ? (
                  <p className=" text-[#2B2B2B] text-lg font-semibold ">&#8360; {price}</p>
                ) : (
                  <p className=" text-[#2B2B2B] text-lg font-semibold ">Free</p>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="  flex items-center gap-1 my-[1.5px] ">
                <svg
                  width="18"
                  height="18"
                  viewBox="3 0 20 20"
                  fill="none"
                  className="  fill-[#949697] hover:fill-[#307EE1] "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6537 3.43348L11.6554 3.43454L15.7757 5.99203L15.7757 5.99206C16.6765 6.55131 17.0802 7.4904 16.9869 8.39014V11.9559C16.9869 12.2256 16.7557 12.4443 16.4706 12.4443C16.1854 12.4443 15.9543 12.2256 15.9543 11.9559V10.1596C15.8971 10.2014 15.8376 10.2416 15.7757 10.2801L15.7757 10.2801L14.907 10.8193V13.7599C14.907 14.2945 14.6918 14.8204 14.3692 15.2444C14.0466 15.6684 13.5882 16.028 13.0533 16.1967L10.8569 16.8872C10.8553 16.8877 10.8537 16.8882 10.8521 16.8886C10.5925 16.9676 10.2825 17 9.99627 17C9.71052 17 9.40085 16.9677 9.14299 16.8879L9.14078 16.8872L6.9444 16.1967C6.40956 16.028 5.95108 15.6684 5.62853 15.2444C5.30592 14.8204 5.09069 14.2945 5.09069 13.7599L5.09733 10.8161L4.23049 10.2807C2.58984 9.26735 2.58983 6.99826 4.23049 5.98491L8.37316 3.42629L8.3739 3.42583C8.84809 3.13115 9.44488 2.99906 10.0138 3C10.5824 3.00095 11.1793 3.13485 11.6537 3.43348ZM15.9594 7.97951C15.956 8.00198 15.9543 8.02493 15.9543 8.04827V8.33573C15.8965 8.77281 15.6481 9.19076 15.2092 9.46329L15.2092 9.46332L11.0858 12.0228L11.0854 12.023C10.8162 12.1904 10.4287 12.2895 10.0129 12.2895C9.59706 12.2895 9.20957 12.1904 8.94039 12.023L8.93901 12.0222L4.79496 9.46268C3.77845 8.83484 3.77845 7.43077 4.79495 6.80293L8.93901 4.24345L8.94039 4.24259C9.20954 4.07519 9.59682 3.97622 10.012 3.9769C10.4271 3.97759 10.8138 4.07783 11.0826 4.24737L11.0844 4.24845L11.0858 4.24935L15.2092 6.8088C15.6625 7.09028 15.9126 7.5269 15.9594 7.97951ZM13.8745 11.4602V13.7599C13.8745 14.0525 13.7524 14.383 13.5312 14.6737C13.3099 14.9645 13.0181 15.178 12.7269 15.2699L12.7268 15.2699L10.534 15.9592C10.408 15.9972 10.2131 16.0231 9.99627 16.0231C9.77833 16.0231 9.58591 15.9969 9.4651 15.9597L9.46417 15.9594L7.27093 15.2699L7.27065 15.2698C6.97952 15.1779 6.68777 14.9645 6.46657 14.6737C6.24547 14.3831 6.1234 14.0528 6.12327 13.7604V13.7599L6.12847 11.4529L8.37316 12.8393L8.3738 12.8397C8.84798 13.1344 9.44459 13.2664 10.0129 13.2664C10.5814 13.2664 11.1782 13.1343 11.6525 12.8394L13.8745 11.4602Z"
                  />
                </svg>
                <p className="  text-[#949697] text-sm ">{author}</p>
              </div>
              {/* progress bar  */}
              <div className="w-full mt-4  bg-gray-200 rounded-full h-1">
                <div className="bg-themeBlue h-1 rounded-full" style={{ width: `${percentageComplete || 0}%` }}></div>
              </div>
              {percentageComplete > 0 ? (
                <div className="mt-3 mb-4 flex gap-1 justify-between items-center">
                  <p className=" text-themeGray6 flex-1  ">
                    {percentageComplete === 100 ? 'Completed' : percentageComplete + '% Complete'}
                  </p>
                  {
                    <button
                      className=" text-sm text-themeBlue  font-medium "
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isLoading) {
                          console.log(currentReview);
                          setOpened(true);
                        }
                      }}
                    >
                      {hasReviewed ? 'Edit Rating' : 'Leave a Rating'}
                    </button>
                  }
                </div>
              ) : (
                <p className=" text-themeBlue font-medium mt-3 mb-4 ">Start Course</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
