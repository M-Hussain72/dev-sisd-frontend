import { NumberFormatter, Rating, Spoiler } from '@mantine/core';

import CoursePricing from './CoursePricing';
import FeedBack from './FeedBack';
import InstructorInfoBar from '../helper/InstructorInfoBar';
import { CourseIn } from '../../interface/courseInterface';
import ReactMarkdown from 'react-markdown';
import CourseSection from '../CourseSection';
import CourseContent from './CourseContent';
import { formatDate, formatTimeInDays } from '../../utils/formatTime';
import CustomSpoiler from '../helper/Spoiler';

export default function CourseDetailContainer({ ...course }: CourseIn) {
  return (
    <div className="lg:max-w-[904px] max-w-[600px] mx-auto  lg:mt-8 mt-0 ">
      <h1 className=" text-resHeading  font-semibold text-themeBlack ">{course.title}</h1>
      <p className=" text-resLg cursor-default  text-themeGray mt-2 ">{course.shortDescription}</p>
      <div className="mt-4">
        <InstructorInfoBar instructor={course.author} language={course.language} subtitle={'english'} />
      </div>

      <div className="flex flex-wrap mt-2">
        {course.rating > 0 && (
          <div className=" flex flex-wrap ">
            {' '}
            <span className=" mr-2 text-sm font-semibold text-themeBlack">{course.rating.toFixed(1)}</span>
            <Rating
              value={course.rating}
              size={'sm'}
              fractions={2}
              className="gap-1 mt-[0.5px]"
              color="#FFD05A"
              emptySymbol={
                <svg width="18" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                  <path
                    d="M7 1.21914L8.50914 4.87861C8.63559 5.18522 8.92633 5.3855 9.2493 5.40683L13.2578 5.67149L10.1851 8.17145C9.92985 8.37909 9.81415 8.71654 9.89778 9.04022L10.8795 12.84L7.45292 10.7452L7.19213 11.1718L7.45292 10.7452C7.17536 10.5756 6.82464 10.5756 6.54708 10.7452L3.12055 12.84L4.10222 9.04022C4.18585 8.71654 4.07015 8.37909 3.81493 8.17145L0.742158 5.67149L4.7507 5.40683C5.07367 5.3855 5.36441 5.18521 5.49086 4.87861L5.07203 4.70588L5.49086 4.87861L7 1.21914Z"
                    stroke="#D1D7DC"
                  />
                </svg>
              }
              readOnly
            />
            {/* no of reviews */}
            <span className=" mx-1 text-sm text-themeGray cursor-default">
              (
              <span className=" text-themeBlue">
                <NumberFormatter thousandSeparator value={course.noOfReviews} /> Reviews
              </span>
              ){' '}
            </span>
          </div>
        )}

        {/*  add total not of registers */}

        {/* {course. < 0 && (
          <span className=" text-sm text-themeGray cursor-default">
            <NumberFormatter thousandSeparator value={1247052} /> students
          </span>
        )} */}
      </div>
      <div className=" flex mt-2">
        <svg width="16" height="17" viewBox="0 0 16 17" className="mt-[0.6%]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.77419 8.5C8.77419 8.07242 8.42758 7.72581 8 7.72581C7.57242 7.72581 7.22581 8.07242 7.22581 8.5V12.629C7.22581 13.0566 7.57242 13.4032 8 13.4032C8.42758 13.4032 8.77419 13.0566 8.77419 12.629V8.5Z"
            fill="#626465"
          />
          <path
            d="M9.03226 5.40323C9.03226 4.83313 8.57012 4.37097 8 4.37097C7.42988 4.37097 6.96774 4.83313 6.96774 5.40323C6.96774 5.97332 7.42988 6.43548 8 6.43548C8.57012 6.43548 9.03226 5.97332 9.03226 5.40323Z"
            fill="#626465"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.96774 0.5C3.11956 0.5 0 3.61956 0 7.46774V9.53226C0 13.3804 3.11956 16.5 6.96774 16.5H9.03226C12.8804 16.5 16 13.3804 16 9.53226V7.46774C16 3.61956 12.8804 0.5 9.03226 0.5H6.96774ZM1.54839 7.46774C1.54839 4.47471 3.97471 2.04839 6.96774 2.04839H9.03226C12.0253 2.04839 14.4516 4.47471 14.4516 7.46774V9.53226C14.4516 12.5253 12.0253 14.9516 9.03226 14.9516H6.96774C3.97471 14.9516 1.54839 12.5253 1.54839 9.53226V7.46774Z"
            fill="#626465"
          />
        </svg>
        {course.updatedAt > course.createdAt && (
          <p className=" ml-2 cursor-default text-themeGray text-resLg">Last updated {formatDate(course.updatedAt)}</p>
        )}
      </div>
      <div className=" lg:hidden block my-6">
        <CoursePricing {...course} courseId={course._id} />
      </div>

      <div className=" mt-20">
        <h1 className="text-[28px] sm:text-[34px] font-semibold">What you’ll learn</h1>
        <CustomSpoiler maxHeight={226} showLabel="Show More" hideLabel="Show Less">
          <ul className=" mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.learningOutcomes?.map((item, index) => (
              <li key={index} className=" flex gap-2 text-sm text-themeGray">
                <label className=" mt-[3px]">
                  <svg width="14" height="14" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.1999 5.55C12.4779 5.87131 12.4644 6.37763 12.1699 6.68089L7.66871 11.3155C7.172 11.827 6.38333 11.827 5.88662 11.3155L3.82987 9.1978C3.53533 8.89454 3.52193 8.38822 3.79992 8.06691C4.07791 7.74559 4.54204 7.73097 4.83658 8.03423L6.77767 10.0329L11.1632 5.51732C11.4577 5.21406 11.9219 5.22868 12.1999 5.55Z"
                      fill="#626465"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 12.5689C0 14.74 1.76003 16.5 3.93114 16.5H12.0689C14.2399 16.5 16 14.74 16 12.5689V4.43114C16 2.26006 14.2399 0.5 12.0689 0.5H3.93114C1.76003 0.5 0 2.26007 0 4.43114V12.5689ZM3.93114 15.1479C2.50678 15.1479 1.35211 13.9932 1.35211 12.5689V4.43114C1.35211 3.00681 2.50679 1.85211 3.93114 1.85211H12.0689C13.4932 1.85211 14.6479 3.00682 14.6479 4.43114V12.5689C14.6479 13.9932 13.4932 15.1479 12.0689 15.1479H3.93114Z"
                      fill="#626465"
                    />
                  </svg>
                </label>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </CustomSpoiler>
      </div>

      <div className=" mt-20">
        <h1 className=" text-[34px] font-semibold mb-2 ">Course Content</h1>
        <div className=" flex flex-wrap items-center sm:text-lg text-base text-themeGray6 mb-10">
          <p>{course.content && course.content.length} sections </p>
          <span className=" text-3xl  ml-1 mr-[2px]">•</span>
          <p>{course.videoCount + course.articleCount + course.assessmentCount} lectures</p>
          {course.totalVideoDuration > 0 && <span className=" text-3xl  ml-1 mr-[2px]">•</span>}
          {course.totalVideoDuration > 0 && <p> {formatTimeInDays(course.totalVideoDuration)} total length</p>}
        </div>
        <CourseContent content={course.content} courseId={course._id} />
      </div>

      <div className=" mt-20">
        <h1 className=" text-[28px] sm:text-[34px] font-semibold">Requirements</h1>
        <CustomSpoiler maxHeight={226} showLabel="Show More" hideLabel="Show Less">
          <ul className=" mt-8 flex flex-col gap-6">
            {course.learningOutcomes?.map((item, index) => (
              <li key={index} className=" flex gap-2 text-sm sm:text-base  text-themeGray">
                <label className=" mt-[4.5px]">
                  <svg width="14" height="14" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.1999 5.55C12.4779 5.87131 12.4644 6.37763 12.1699 6.68089L7.66871 11.3155C7.172 11.827 6.38333 11.827 5.88662 11.3155L3.82987 9.1978C3.53533 8.89454 3.52193 8.38822 3.79992 8.06691C4.07791 7.74559 4.54204 7.73097 4.83658 8.03423L6.77767 10.0329L11.1632 5.51732C11.4577 5.21406 11.9219 5.22868 12.1999 5.55Z"
                      fill="#626465"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 12.5689C0 14.74 1.76003 16.5 3.93114 16.5H12.0689C14.2399 16.5 16 14.74 16 12.5689V4.43114C16 2.26006 14.2399 0.5 12.0689 0.5H3.93114C1.76003 0.5 0 2.26007 0 4.43114V12.5689ZM3.93114 15.1479C2.50678 15.1479 1.35211 13.9932 1.35211 12.5689V4.43114C1.35211 3.00681 2.50679 1.85211 3.93114 1.85211H12.0689C13.4932 1.85211 14.6479 3.00682 14.6479 4.43114V12.5689C14.6479 13.9932 13.4932 15.1479 12.0689 15.1479H3.93114Z"
                      fill="#626465"
                    />
                  </svg>
                </label>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </CustomSpoiler>
      </div>

      <div className=" mt-20">
        <h1 className=" text-[34px] font-semibold mb-8">Description</h1>
        <CustomSpoiler maxHeight={226} showLabel="Show More" hideLabel="Show Less">
          <ReactMarkdown
            className={
              ' prose-strong:font-semibold prose-strong:text-themeBlack  prose-headings:font-bold  prose-headings:mb-4  prose-sm sm:prose-base text-themeGray6 prose-headings:text-themeBlack sm:prose-h1:text-3xl prose-h1:text-2xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-xl p-0   '
            }
          >
            {course.description}
          </ReactMarkdown>
          {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" /> */}
        </CustomSpoiler>
      </div>

      <div className=" mt-20">{course && <FeedBack courseId={course._id} rating={course.rating} />}</div>
    </div>
  );
}
