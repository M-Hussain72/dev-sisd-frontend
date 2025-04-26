import { useEffect, useState } from 'react';
import CourseContentItem, { ContentItemType } from './CourseContentItem';
import CourseSection from './CourseSection';
import { useMediaQuery } from '@mantine/hooks';
import { Link, Outlet, useNavigate, useParams } from '@tanstack/react-router';

import { ContentIn } from '../interface/courseInterface';
import { LectureNavigationContext } from '../context/LectureNavigationContext'; // adjust path

const CourseLessonPage = ({ courseSection, initialLectureId }: { courseSection: ContentIn; initialLectureId: string }) => {
  const { courseSlug, sectionId } = useParams({
    from: '/course/$courseSlug/learn/$sectionId/lecture',
  });

  const [selectedLectureId, setSelectedLectureId] = useState(initialLectureId);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    window.scrollTo({
      top: 50,
      left: 0,
      behavior: 'smooth',
    });
  }, [selectedLectureId]);

  const currentLecture =
    courseSection.sectionContent.find((item) => item._id === selectedLectureId) ?? courseSection.sectionContent[0];

  function handleLectureChange(id: string, type: 'video' | 'assessment' | 'article') {
    setSelectedLectureId(id);
    if (type === 'assessment') {
      navigate({ to: `/course/${courseSlug}/learn/${sectionId}/quiz/${id}` });
    }
    navigate({ to: `/course/${courseSlug}/learn/${sectionId}/lecture/${id}` });
  }

  function handlePrevLecture() {
    const currentLectureIndex = courseSection.sectionContent.findIndex((item) => item._id === selectedLectureId);
    //  const sectionLength = courseSection.sectionContent.length
    if (currentLectureIndex > 0 && currentLectureIndex != -1) {
      const prevLecture = courseSection.sectionContent[currentLectureIndex - 1];
      handleLectureChange(prevLecture._id, prevLecture.type);
    }
  }

  function handleForwardLecture() {
    console.log('completed forwared');
    const currentLectureIndex = courseSection.sectionContent.findIndex((item) => item._id === selectedLectureId);
    const sectionLength = courseSection?.sectionContent?.length;
    if (currentLectureIndex < sectionLength - 1 && currentLectureIndex != -1) {
      const prevLecture = courseSection.sectionContent[currentLectureIndex + 1];
      handleLectureChange(prevLecture._id, prevLecture.type);
    }
  }

  return (
    <LectureNavigationContext.Provider
      value={{
        handleForwardLecture,
        handlePrevLecture,
        setSelectedLectureId,
        selectedLectureId,
      }}
    >
      <div className=" lg:mr-3 px-4 mx-auto mb-12 ">
        {/* navigate to back the course dashboard page */}
        <Link to={`/course/${courseSlug}/learn`} replace={true} className=" flex  items-center">
          <svg width="43" height="17" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 5L0.646447 4.64645L0.292893 5L0.646447 5.35355L1 5ZM13 5.5C13.2761 5.5 13.5 5.27614 13.5 5C13.5 4.72386 13.2761 4.5 13 4.5V5.5ZM4.64645 0.646447L0.646447 4.64645L1.35355 5.35355L5.35355 1.35355L4.64645 0.646447ZM0.646447 5.35355L4.64645 9.35355L5.35355 8.64645L1.35355 4.64645L0.646447 5.35355ZM1 5.5H13V4.5H1V5.5Z"
              fill="#222222"
            />
          </svg>

          <h1 className=" text-xl font-medium text-themeBlack">{courseSection.sectionTitle}</h1>
        </Link>
        <div className=" flex lg:flex-row flex-col-reverse sm:gap-6  mt-4">
          <ol className=" flex-1  min-w-[200px] lg:max-h-[600px] lg:overflow-scroll w-full  py-[24px] pr-1 lg:border-r-[2px] lg:border-y-[2px] lg:border-l-0  border-[1px] rounded-xl border-[#eeeeee] lg:rounded-l-none  lg:rounded-r-2xl shadow-sm ">
            {courseSection.sectionContent.map((item) => (
              <CourseSection
                section={{
                  id: item._id,
                  type: item.type,
                  value: (
                    <li key={item._id} className="">
                      <CourseContentItem
                        {...item}
                        isSideBar={!isSmallScreen ? false : true}
                        purchased={true}
                        courseId=""
                        selected={selectedLectureId === item._id}
                      />
                    </li>
                  ),
                }}
                selectedSection={selectedLectureId}
                onChange={handleLectureChange}
              />
            ))}
          </ol>
          <div className="w-full mb-4  max-w-[1100px]">
            <div className=" lg:mb-3 mb-2  flex sm:flex-row flex-col-reverse justify-between sm:gap-6">
              <h1 className=" text-resHeading font-semibold lg:text-[34px]"> {currentLecture.title}</h1>
              <div className=" sm:mt-0 mt-2 flex justify-end gap-6 items-center xl:mr-20 mr-4 ">
                <button
                  className=" group text-themeBlue hover:text-blue-600 font-medium flex items-center "
                  onClick={handlePrevLecture}
                >
                  <svg
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    className="fill-themeBlue group-hover:fill-blue-600 "
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.95049 0L6 0.954L2.09901 4.5L6 8.046L4.95049 9L0 4.5L4.95049 0Z" />
                  </svg>
                  <span className=" ml-3">Previous</span>
                </button>
                <button
                  className=" group text-themeBlue font-medium flex items-center hover:text-blue-600 "
                  onClick={handleForwardLecture}
                >
                  <span className=" mr-3">Next</span>
                  <svg
                    width="6"
                    height="9"
                    className="fill-themeBlue group-hover:fill-blue-600 "
                    viewBox="0 0 6 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.04951 0L0 0.954L3.90099 4.5L0 8.046L1.04951 9L6 4.5L1.04951 0Z" />
                  </svg>
                </button>
              </div>
            </div>
            <Outlet />
          </div>
        </div>

        {/* Section Description add Section Description when SectionDescription Available */}

        {/* <div className=" mx-10 mt-6">
          <h1 className=" text-[24px] text-themeBlack font-semibold capitalize ">{courseSection.sectionTitle}</h1>
          <p className=" my-4 text-lg text-themeGray">
            Get ready to begin the design process for a new portfolio project: a mobile app! This part of the course will
            focus on empathizing with users, which is the first phase of the design process. You’ll think through the needs
            of your potential users to build empathy maps and create personas. These hands-on activities will help you
            understand user perspectives and pain points.
          </p>
        </div> */}
      </div>
    </LectureNavigationContext.Provider>
  );
};

export default CourseLessonPage;
