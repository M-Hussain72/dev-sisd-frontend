import Divider from './ui/divider';
import VideoIcon from '../assets/VideoIcon';
import ReadingIcon from '../assets/ReadingIcon';
import QuizIcon from '../assets/QuizIcon';
import CourseContentItem, { ContentItemType } from './CourseContentItem';
import { ContentIn } from '../interface/courseInterface';
import { Link, useParams } from '@tanstack/react-router';
import { formatTimeInHours } from '../utils/formatTime';

// interface SectionOverviewType {
//   sectionId: string;
//   sectionTitle: string;
//   sectionContent: {
//     _id: string;
//     title: string;
//     type: 'video' | 'assessment' | 'article';
//     video: string | null;
//     duration: number;
//     preview: boolean;
//   }[];
// }

export default ({ sectionContent, sectionTitle, _id: sectionId }: ContentIn) => {
  const { courseSlug } = useParams({ from: '/course/$courseSlug/learn/' });
  let sectionDuration = 0;
  let noOfArticles = 0;
  let noOfQuiz = 0;
  sectionContent.map((item) => {
    sectionDuration += item.duration;
    if (item.type === 'article') {
      noOfArticles++;
    }
    if (item.type == 'assessment') {
      noOfQuiz++;
    }
  });
  return (
    <>
      <div className="  p-6 border-2 border-[#eeeeee] rounded-xl max-w-[900px] ">
        <h1 className=" text-[24px] text-themeBlack font-semibold capitalize">{sectionTitle}</h1>
        <div className="flex  gap-6 mt-4">
          {sectionDuration > 0 && (
            <div className=" group flex items-center gap-2 ">
              <VideoIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {formatTimeInHours(sectionDuration)} of video lecture
              </p>
            </div>
          )}

          {noOfArticles > 0 && (
            <div className=" group flex items-center gap-2 ">
              <ReadingIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {noOfArticles} reading material
              </p>
            </div>
          )}

          {noOfQuiz > 0 && (
            <div className=" group flex items-center gap-2  ">
              <QuizIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {noOfQuiz} graded assessment
              </p>
            </div>
          )}
        </div>
        <p className=" my-4 text-lg text-themeGray">
          Get ready to begin the design process for a new portfolio project: a mobile app! This part of the course will focus
          on empathizing with users, which is the first phase of the design process. You’ll think through the needs of your
          potential users to build empathy maps and create personas. These hands-on activities will help you understand user
          perspectives and pain points.
        </p>
        <Divider color=" my-6 border-[#eeeeee]" />

        <ul className="  space-y-5 ">
          {sectionContent.map((item) => (
            <Link to={`/course/${courseSlug}/learn/${sectionId}/lecture/${item._id}`}>
              <CourseContentItem {...item} isSideBar={false} purchased={true} courseId="" selected={false} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
