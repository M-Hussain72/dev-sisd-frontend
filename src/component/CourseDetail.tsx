import { useMediaQuery } from '@mantine/hooks';
import CourseDetailCard from './CourseDetailComponent/CourseDetailCard';
import CourseDetailContainer from './CourseDetailComponent/CourseDetailContainer';
import defaultImage from '../assets/defaultCourseImg.png';
import { CourseIn } from '../interface/courseInterface';

export default function CourseDetail({ ...course }: CourseIn) {
  const isSmallScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <div className=" flex lg:flex-nowrap flex-wrap-reverse   justify-between  gap-6 my-10 lg:mx-10 mx-4 ">
      <CourseDetailContainer {...course} />
      {isSmallScreen ? (
        <div className="">
          <CourseDetailCard courseId={course.id} {...course} />
        </div>
      ) : (
        <div className=" max-w-[600px] mx-auto">
          <div className=" after:w-full after:absolute after:left-0 after:top-0 relative after:text-[#fff]  after:h-full after:bg-gradient-to-t after:from-[#2d2f31d3]   ">
            <img
              src={course.poster ? course.poster : defaultImage}
              alt="name"
              className=" w-full border-[1px] border-[#2d2f31]  "
            />
            <div className=" text-white absolute z-10 bottom-[10%] left-0 right-0 mx-auto w-fit">
              <span className=" font-semibold ">Preview this course</span>
            </div>
            <div className=" absolute z-10 bottom-0 top-0 left-0 right-0 mx-auto my-auto h-fit w-fit">
              {' '}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" my-auto  xs:w-[64px] xs:h-[64px] w-[35px] h-[35px] "
              >
                <path
                  d="M24.4211 45.6032L45.6032 32L24.4211 18.3969V45.6032ZM32.0056 64C27.5797 64 23.4196 63.1601 19.5253 61.4804C15.6309 59.8007 12.2433 57.5211 9.36255 54.6417C6.48176 51.7622 4.20113 48.3761 2.52068 44.4834C0.840227 40.5908 0 36.4315 0 32.0056C0 27.5798 0.839862 23.4196 2.51959 19.5253C4.19931 15.6309 6.47889 12.2433 9.35834 9.36256C12.2378 6.48176 15.6239 4.20114 19.5166 2.52068C23.4092 0.84023 27.5685 0 31.9944 0C36.4202 0 40.5804 0.839866 44.4747 2.51959C48.3691 4.19931 51.7567 6.47889 54.6374 9.35834C57.5182 12.2378 59.7989 15.6239 61.4793 19.5166C63.1598 23.4092 64 27.5685 64 31.9944C64 36.4203 63.1601 40.5804 61.4804 44.4747C59.8007 48.3691 57.5211 51.7567 54.6417 54.6374C51.7622 57.5182 48.3761 59.7989 44.4834 61.4793C40.5908 63.1598 36.4315 64 32.0056 64ZM32 58.9474C39.5228 58.9474 45.8948 56.3369 51.1158 51.1158C56.3369 45.8948 58.9474 39.5228 58.9474 32C58.9474 24.4772 56.3369 18.1052 51.1158 12.8842C45.8948 7.6631 39.5228 5.05256 32 5.05256C24.4772 5.05256 18.1052 7.6631 12.8842 12.8842C7.66309 18.1052 5.05256 24.4772 5.05256 32C5.05256 39.5228 7.66309 45.8948 12.8842 51.1158C18.1052 56.3369 24.4772 58.9474 32 58.9474Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
