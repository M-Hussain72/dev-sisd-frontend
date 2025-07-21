import Divider from './ui/divider';
import VideoIcon from '../assets/VideoIcon';
import ReadingIcon from '../assets/ReadingIcon';
import QuizIcon from '../assets/QuizIcon';
import CourseContentItem, { ContentItemType } from './CourseContentItem';
import { ContentIn } from '../interface/courseInterface';
import { Link, useParams } from '@tanstack/react-router';
import { formatTimeInHours } from '../utils/formatTime';
import { useMemo } from 'react';

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

export default ({ sectionContent, sectionDescription, sectionTitle, _id: sectionId }: ContentIn) => {
  const { courseSlug } = useParams({ from: '/course/$courseSlug/learn/' });

  const { totalDuration, articleCount, quizCount } = useMemo(() => {
    let totalDuration = 0;
    let articleCount = 0;
    let quizCount = 0;

    sectionContent.forEach((item) => {
      if (item.type === 'video') {
        totalDuration += item.duration;
      } else if (item.type === 'article') {
        articleCount++;
      } else if (item.type === 'assessment') {
        quizCount++;
      }
    });

    return { totalDuration, articleCount, quizCount };
  }, [sectionContent]);
  return (
    <>
      <div className="  p-6 border-2 border-[#eeeeee] rounded-xl max-w-[900px] ">
        <h1 className=" sm:text-[24px] text-xl text-themeBlack font-semibold capitalize">{sectionTitle}</h1>
        <div className="flex flex-wrap  gap-6 mt-4">
          {totalDuration > 0 && (
            <div className=" group flex items-center gap-2 ">
              <VideoIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {formatTimeInHours(totalDuration)} of video lecture
              </p>
            </div>
          )}

          {articleCount > 0 && (
            <div className=" group flex items-center gap-2 ">
              <ReadingIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {articleCount} reading material
              </p>
            </div>
          )}

          {quizCount > 0 && (
            <div className=" group flex items-center gap-2  ">
              <QuizIcon w="18" h="19" />
              <p className="  cursor-default text-[#949697] text-resLg xl:text-lg capitalize  line-clamp-2">
                {quizCount} graded assessment
              </p>
            </div>
          )}
        </div>
        {sectionDescription && <p className=" my-4 text-lg text-themeGray">{sectionDescription}</p>}
        <Divider color=" my-6 border-[#eeeeee]" />

        <ul className="  space-y-5 ">
          {sectionContent.map((item) => (
            <li key={item._id}>
              <Link to={`/course/${courseSlug}/learn/${sectionId}/lecture/${item._id}`}>
                <CourseContentItem {...item} isSideBar={false} purchased={true} courseId="" selected={false} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
