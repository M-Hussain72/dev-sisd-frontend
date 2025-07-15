import { useEffect, useState } from 'react';
import CourseContentItem, { ContentItemType } from './CourseContentItem';
import CourseSection from './CourseSection';
import { useMediaQuery } from '@mantine/hooks';
import { Link, Outlet, useNavigate, useParams } from '@tanstack/react-router';

import { ContentIn } from '../interface/courseInterface';
import { LectureNavigationContext } from '../context/LectureNavigationContext'; // adjust path

const CourseLessonPage = ({ sections, initialLectureId }: { sections: ContentIn[]; initialLectureId: string }) => {
  const { courseSlug, sectionId } = useParams({
    from: '/course/$courseSlug/learn/$sectionId/lecture',
  });
  const initialSectionIndex = sections && sections.findIndex((s) => s._id === sectionId);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSectionIndex > -1 ? initialSectionIndex : 0);
  const currentSection = sections[currentSectionIndex];

  const [selectedLectureId, setSelectedLectureId] = useState(initialLectureId);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 50,
      left: 0,
    });
  }, [selectedLectureId]);

  function handleLectureChange(id: string, type: 'video' | 'assessment' | 'article' | 'assignment') {
    setSelectedLectureId(id);
    if (type === 'assessment') {
      navigate({ to: `/course/${courseSlug}/learn/${sectionId}/quiz/${id}` });
    }
    navigate({ to: `/course/${courseSlug}/learn/${sectionId}/lecture/${id}` });
  }

  const currentLectureList = currentSection.sectionContent;
  const currentLectureIndex = currentLectureList.findIndex((lec) => lec._id === selectedLectureId);
  const currentLecture = currentLectureList[currentLectureIndex] ?? currentLectureList[0];

  const goToLecture = (sectionIdx: number, lectureIdx: number) => {
    const sec = sections[sectionIdx];
    const lec = sec.sectionContent[lectureIdx];
    setCurrentSectionIndex(sectionIdx);
    setSelectedLectureId(lec._id);
    navigate({
      to: `/course/${courseSlug}/learn/${sec._id}/${'lecture'}/${lec._id}`,
    });
  };

  function handlePrevLecture() {
    // If there’s a previous lecture in this section, go to it:
    if (currentLectureIndex > 0) {
      return goToLecture(currentSectionIndex, currentLectureIndex - 1);
    }
    // Otherwise, roll back into the previous section if it exists:
    if (currentSectionIndex > 0) {
      const prevSectIdx = currentSectionIndex - 1;
      const lastIdx = sections[prevSectIdx].sectionContent.length - 1;
      return goToLecture(prevSectIdx, lastIdx);
    }
    //  else: you’re already at very first lecture of very first section
  }

  function handleForwardLecture() {
    // If there’s a next lecture in this section, go to it:
    if (currentLectureIndex < currentLectureList.length - 1) {
      return goToLecture(currentSectionIndex, currentLectureIndex + 1);
    }
    // Otherwise, roll forward into the next section if it exists:
    if (currentSectionIndex < sections.length - 1) {
      // first lecture of next section
      return goToLecture(currentSectionIndex + 1, 0);
    }
    // else: you’re already at the very last lecture of the very last section
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
        <Link
          to={`/course/${courseSlug}/learn`}
          search={{ sectionId: currentSection._id }}
          replace={true}
          className=" flex  items-center sm::mt-0 mt-2"
        >
          <svg
            className=" sm:w-[43px] sm:h-[17px] w-[33px] h-[12px]"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L0.646447 4.64645L0.292893 5L0.646447 5.35355L1 5ZM13 5.5C13.2761 5.5 13.5 5.27614 13.5 5C13.5 4.72386 13.2761 4.5 13 4.5V5.5ZM4.64645 0.646447L0.646447 4.64645L1.35355 5.35355L5.35355 1.35355L4.64645 0.646447ZM0.646447 5.35355L4.64645 9.35355L5.35355 8.64645L1.35355 4.64645L0.646447 5.35355ZM1 5.5H13V4.5H1V5.5Z"
              fill="#222222"
            />
          </svg>

          <h1 className=" md:text-xl sm:text-lg text-sm font-medium text-themeBlack">{currentSection.sectionTitle}</h1>
        </Link>
        <div className=" flex lg:flex-row flex-col-reverse sm:gap-6  mt-4">
          <ol className=" flex-1  min-w-[200px] lg:max-h-[600px] lg:overflow-scroll w-full  py-[24px] pr-1 lg:border-r-[2px] lg:border-y-[2px] lg:border-l-0  border-[1px] rounded-xl border-[#eeeeee] lg:rounded-l-none  lg:rounded-r-2xl shadow-sm ">
            {currentSection.sectionContent.map((item) => (
              <CourseSection
                section={{
                  id: item._id,
                  type: item.type,
                  value: (
                    <CourseContentItem
                      {...item}
                      isSideBar={true}
                      purchased={true}
                      courseId=""
                      selected={selectedLectureId === item._id}
                    />
                  ),
                }}
                selectedSection={selectedLectureId}
                onChange={handleLectureChange}
              />
            ))}
          </ol>
          <div className="w-full mb-4  max-w-[1100px]">
            <div className=" lg:mb-3 sm:mt-0 mt-3 ml-1  flex flex-row  justify-between  sm:gap-6">
              <h1 className=" min-[400px]:text-resHeading font-semibold lg:text-[34px]">
                {currentLecture.type === 'assessment'
                  ? 'Quiz: '
                  : currentLecture.type === 'assignment'
                    ? 'Assignment: '
                    : ''}
                {currentLecture.title}
              </h1>
              <div className=" sm:text-base text-sm sm:mt-0 mt-2 flex justify-end sm:gap-6 gap-4 items-center xl:mr-20 mr-4 ">
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
                  <span className=" sm:ml-3 ml-[6px]">Previous</span>
                </button>
                <button
                  className=" group text-themeBlue font-medium flex items-center hover:text-blue-600 "
                  onClick={handleForwardLecture}
                >
                  <span className=" sm:mr-3 mr-[6px]">Next</span>
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
