import { NumberFormatter } from '@mantine/core';
import AddToCartBtn from '../AddToCartBtn';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useAddToCart } from '../../hook/useAddToCart';
import { formatTimeInHours } from '../../utils/formatTime';

export default function CoursePricing({
  courseId,
  title,
  articleCount,
  rating,
  noOfReviews,
  author,
  videoCount,
  totalVideoDuration,
  poster,
  price,
  level,
  assessmentCount,
  subscribe = false,
}: {
  price: number;
  title: string;
  articleCount: number;
  rating: number;
  noOfReviews: number;
  author: string;
  videoCount: number;
  poster: string;
  totalVideoDuration: number;
  subscribe: boolean;
  level: 'all-level' | 'beginner' | 'intermediate' | 'experts';
  courseId: string;
  assessmentCount: number;
}) {
  const param = useParams({ from: '/course/$courseSlug/' });
  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  function handleAddToCart() {
    mutate({
      course: {
        id: courseId,
        poster,
        title,
        price,
        rating,
        author,
        noOfReviews,
        totalVideoDuration,
        articleCount,
        videoCount,
        level,
      },
    });
  }
  return (
    <>
      <h1 className=" text-[42px] font-semibold ">
        {price > 0 ? <NumberFormatter prefix="Rs " thousandSeparator value={price} /> : 'Free'}
      </h1>
      <div className=" mt-2 gap-2">
        {!subscribe ? (
          <>
            {' '}
            <AddToCartBtn courseId={courseId} addToCart={handleAddToCart} />
            {/* <button className=" mt-6 py-3 px-6 w-full text-lg text-[#307EE1] font-semibold text-nowrap bg-white border-[1px] border-[#307EE1] hover:bg-[#307EE1] hover:text-white   rounded-lg">
              Gift This Course
            </button> */}
          </>
        ) : (
          <button
            onClick={() => navigate({ to: `/course/${param.courseSlug}/learn` })}
            className=" py-3 px-6 w-full bg-[#307EE1]  text-lg font-semibold text-nowrap text-white   hover:bg-[#3c67ca]  rounded-lg"
          >
            Go To Course
          </button>
        )}
      </div>
      <div className="w-full border-t my-5 border-[#EEEEEE]"></div>
      <h2 className=" text-xl text-themeBlack font-semibold mb-3">This Course Includes:</h2>
      <ul className=" space-y-3">
        <li key="video" className=" flex gap-2">
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[5px]"
          >
            <path
              d="M1.757 15C1.26603 15 0.850449 14.825 0.51026 14.475C0.170087 14.125 0 13.6974 0 13.1923V1.8077C0 1.30257 0.170087 0.875 0.51026 0.525C0.850449 0.175 1.26603 0 1.757 0H12.8224C13.3134 0 13.729 0.175 14.0692 0.525C14.4094 0.875 14.5795 1.30257 14.5795 1.8077V6.38463L18 2.86543V12.1345L14.5795 8.61533V13.1923C14.5795 13.6974 14.4094 14.125 14.0692 14.475C13.729 14.825 13.3134 15 12.8224 15H1.757ZM1.757 13.5H12.8224C12.9097 13.5 12.9813 13.4711 13.0374 13.4134C13.0935 13.3557 13.1215 13.282 13.1215 13.1923V1.8077C13.1215 1.71795 13.0935 1.64423 13.0374 1.58652C12.9813 1.52882 12.9097 1.49998 12.8224 1.49998H1.757C1.66977 1.49998 1.59811 1.52882 1.54203 1.58652C1.48595 1.64423 1.45791 1.71795 1.45791 1.8077V13.1923C1.45791 13.282 1.48595 13.3557 1.54203 13.4134C1.59811 13.4711 1.66977 13.5 1.757 13.5Z"
              fill="#626465"
            />
          </svg>
          <span className=" text-lg text-themeGray ">{formatTimeInHours(totalVideoDuration)} on-demand video</span>
        </li>
        <li key="articles" className=" flex gap-2">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg "
            className="mt-[5px]"
          >
            <path
              d="M3.9706 14.5294H10.8529V12.9412H3.9706V14.5294ZM3.9706 10.2941H14.0294V8.70591H3.9706V10.2941ZM3.9706 6.05879H14.0294V4.4706H3.9706V6.05879ZM1.91404 18.5C1.37919 18.5 0.926473 18.3147 0.555884 17.9441C0.185295 17.5735 0 17.1208 0 16.586V2.41404C0 1.87919 0.185295 1.42647 0.555884 1.05588C0.926473 0.685295 1.37919 0.5 1.91404 0.5H16.086C16.6208 0.5 17.0735 0.685295 17.4441 1.05588C17.8147 1.42647 18 1.87919 18 2.41404V16.586C18 17.1208 17.8147 17.5735 17.4441 17.9441C17.0735 18.3147 16.6208 18.5 16.086 18.5H1.91404ZM1.91404 16.9118H16.086C16.1674 16.9118 16.2421 16.8779 16.31 16.81C16.3778 16.7421 16.4118 16.6674 16.4118 16.586V2.41404C16.4118 2.33258 16.3778 2.25791 16.31 2.19002C16.2421 2.12215 16.1674 2.08821 16.086 2.08821H1.91404C1.83258 2.08821 1.75791 2.12215 1.69002 2.19002C1.62215 2.25791 1.58821 2.33258 1.58821 2.41404V16.586C1.58821 16.6674 1.62215 16.7421 1.69002 16.81C1.75791 16.8779 1.83258 16.9118 1.91404 16.9118Z"
              fill="#626465"
            />
          </svg>
          <span className=" text-lg text-themeGray ">{articleCount} articles</span>
        </li>
        {assessmentCount > 0 && (
          <li key="quiz" className=" flex gap-2">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[5px]"
            >
              <path
                d="M10.7027 12.4377C10.9409 12.4377 11.1489 12.3488 11.3267 12.171C11.5045 11.9933 11.5933 11.7853 11.5933 11.547C11.5933 11.3088 11.5045 11.1008 11.3267 10.923C11.1489 10.7453 10.9409 10.6564 10.7027 10.6564C10.4644 10.6564 10.2564 10.7453 10.0787 10.923C9.90093 11.1008 9.81205 11.3088 9.81205 11.547C9.81205 11.7853 9.90093 11.9933 10.0787 12.171C10.2564 12.3488 10.4644 12.4377 10.7027 12.4377ZM10.1227 9.51124H11.2827C11.2952 9.07217 11.3516 8.74628 11.4521 8.53359C11.5525 8.32091 11.7904 8.03307 12.1659 7.67007C12.615 7.23972 12.9206 6.8761 13.0827 6.57922C13.2449 6.28234 13.326 5.93744 13.326 5.5445C13.326 4.8522 13.0815 4.2812 12.5925 3.8315C12.1035 3.38181 11.4736 3.15696 10.7027 3.15696C10.1002 3.15696 9.57038 3.32318 9.11321 3.65561C8.65602 3.98805 8.32389 4.4343 8.11683 4.99438L9.16837 5.43597C9.33303 5.04303 9.54416 4.74833 9.80176 4.55187C10.0593 4.35539 10.3596 4.25716 10.7027 4.25716C11.1293 4.25716 11.4798 4.38065 11.7543 4.62764C12.0287 4.87463 12.1659 5.20021 12.1659 5.60437C12.1659 5.85011 12.0964 6.08057 11.9573 6.29576C11.8182 6.51094 11.5771 6.7757 11.2341 7.09005C10.7613 7.50419 10.4579 7.85283 10.3238 8.13598C10.1897 8.41915 10.1227 8.87757 10.1227 9.51124ZM5.16423 15.0946C4.67274 15.0946 4.25674 14.9244 3.91621 14.5838C3.57567 14.2433 3.4054 13.8273 3.4054 13.3358V2.25885C3.4054 1.76737 3.57567 1.35136 3.91621 1.01081C4.25674 0.670271 4.67274 0.5 5.16423 0.5H16.2412C16.7326 0.5 17.1486 0.670271 17.4892 1.01081C17.8297 1.35136 18 1.76737 18 2.25885V13.3358C18 13.8273 17.8297 14.2433 17.4892 14.5838C17.1486 14.9244 16.7326 15.0946 16.2412 15.0946H5.16423ZM5.16423 13.6352H16.2412C16.316 13.6352 16.3846 13.604 16.447 13.5416C16.5094 13.4792 16.5406 13.4106 16.5406 13.3358V2.25885C16.5406 2.184 16.5094 2.11538 16.447 2.053C16.3846 1.99063 16.316 1.95944 16.2412 1.95944H5.16423C5.08937 1.95944 5.02076 1.99063 4.95839 2.053C4.89601 2.11538 4.86482 2.184 4.86482 2.25885V13.3358C4.86482 13.4106 4.89601 13.4792 4.95839 13.5416C5.02076 13.604 5.08937 13.6352 5.16423 13.6352ZM1.75883 18.5C1.26736 18.5 0.851356 18.3297 0.510814 17.9892C0.170271 17.6486 0 17.2326 0 16.7412V4.20481H1.45944V16.7412C1.45944 16.816 1.49063 16.8846 1.55299 16.947C1.61538 17.0094 1.68399 17.0406 1.75883 17.0406H14.2952V18.5H1.75883Z"
                fill="#626465"
              />
            </svg>
            <span className=" text-lg text-themeGray ">{assessmentCount} Quiz</span>
          </li>
        )}
        <li key="cert" className=" flex gap-2">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[5px]"
          >
            <path
              d="M4.43894 18.5V16.9118H8.20591V13.2832C7.30726 13.1027 6.51314 12.7246 5.82355 12.1491C5.13395 11.5735 4.6439 10.8561 4.35339 9.9968C3.13168 9.85155 2.10069 9.333 1.26043 8.44115C0.420142 7.5493 0 6.49048 0 5.26469V4.20587C0 3.77284 0.15645 3.39989 0.469351 3.08701C0.782234 2.7741 1.15519 2.61765 1.58821 2.61765H4.05205V0.5H13.9479V2.61765H16.4118C16.8448 2.61765 17.2178 2.7741 17.5306 3.08701C17.8435 3.39989 18 3.77284 18 4.20587V5.26469C18 6.49048 17.5799 7.5493 16.7396 8.44115C15.8993 9.333 14.8683 9.85155 13.6466 9.9968C13.3561 10.8561 12.866 11.5735 12.1765 12.1491C11.4869 12.7246 10.6927 13.1027 9.79409 13.2832V16.9118H13.5611V18.5H4.43894ZM4.05205 8.2905V4.20587H1.58821V5.26469C1.58821 6.00315 1.81966 6.65169 2.28257 7.21029C2.74547 7.76889 3.33529 8.12896 4.05205 8.2905ZM9 11.7602C9.92988 11.7602 10.7189 11.4361 11.3671 10.7879C12.0153 10.1397 12.3394 9.35068 12.3394 8.42082V2.08821H5.66062V8.42082C5.66062 9.35068 5.98472 10.1397 6.63291 10.7879C7.28109 11.4361 8.07012 11.7602 9 11.7602ZM13.9479 8.2905C14.6647 8.12896 15.2545 7.76889 15.7174 7.21029C16.1803 6.65169 16.4118 6.00315 16.4118 5.26469V4.20587H13.9479V8.2905Z"
              fill="#626465"
            />
          </svg>
          <span className=" text-lg text-themeGray ">Certification of completion</span>
        </li>
      </ul>
    </>
  );
}
