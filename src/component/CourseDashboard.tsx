import { useEffect, useState } from 'react';
import CourseOverviewSection from './CourseOverviewSection';
import CourseSection from './CourseSection';
import InstructorInfoBar from './helper/InstructorInfoBar';
import { Loading } from './ui/Loading';
import { CourseIn } from '../interface/courseInterface';
import { useSearch } from '@tanstack/react-router';

export default function CourseDashboard({ language, author, content, title, shortDescription }: CourseIn) {
  const { sectionId: initialSectionId } = useSearch({ from: '/course/$courseSlug/learn/' });
  const [selectedSectionId, setSelectedSectionId] = useState(initialSectionId || content[0]._id);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [selectedSectionId]);

  const findSection = content.find((item) => item._id === selectedSectionId);
  const selectedSection = findSection ? findSection : content[0];

  return (
    <div className="  mb-20 ">
      <div className="mx-10">
        <h1 className=" text-[32px] font-semibold text-themeBlack ">{title}</h1>
        <p className=" text-[18px] text-themeGray">{shortDescription}</p>
        <div className="mt-4">
          <InstructorInfoBar instructor={author} language={language} subtitle={undefined} />
        </div>
      </div>

      <div className="sm:mt-0 sm:hidden mt-10 ">
        <div
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className=" cursor-pointer font-medium flex items-center w-fit gap-2 p-2 rounded-r-md border-[1px]"
        >
          All Sections
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 7L16.7071 6.29289L17.4142 7L16.7071 7.70711L16 7ZM1 8C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6V8ZM10.7071 0.292893L16.7071 6.29289L15.2929 7.70711L9.29289 1.70711L10.7071 0.292893ZM16.7071 7.70711L10.7071 13.7071L9.29289 12.2929L15.2929 6.29289L16.7071 7.70711ZM16 8H1V6H16V8Z"
              fill="#33363F"
            />
          </svg>
        </div>
      </div>
      <div className=" relative sm:mt-10 mt-4 sm:mr-10 mx-auto px-2 flex gap-4 ">
        <div className={(open ? ' absolute' : ' hidden') + ' sm:block  sm:relative bg-white w-[244px]  '}>
          <ul className=" h-fit w-full max-h-[500px] sm:pt-[46px] pt-[12px]  pb-[24px] pr-1 lg:border-r-[2px] lg:border-y-[2px] lg:border-l-0  border-[1px] rounded-xl border-[#eeeeee] lg:rounded-l-none  lg:rounded-r-2xl shadow-sm overflow-scroll ">
            <div
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className=" mb-1 cursor-pointer flex items-center gap-2 sm:hidden p-2 ml-1 rounded-md border-[1px] w-fit"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 7L1.29289 6.29289L0.585786 7L1.29289 7.70711L2 7ZM17 8C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6V8ZM7.29289 0.292893L1.29289 6.29289L2.70711 7.70711L8.70711 1.70711L7.29289 0.292893ZM1.29289 7.70711L7.29289 13.7071L8.70711 12.2929L2.70711 6.29289L1.29289 7.70711ZM2 8H17V6H2V8Z"
                  fill="#33363F"
                />
              </svg>
              Close
            </div>
            <h2 className=" sm:block hidden absolute bg-white pb-2 pl-2 w-full right-0 top-0 rounded-tr-lg border-r-2  border-t-2 pt-4 text-themeBlack text-lg font-semibold ml-3">
              Course Sections
            </h2>
            {content.map((item, index) => (
              //  in section "type" parameter only just for typeSafe
              <CourseSection
                key={item._id}
                section={{
                  id: item._id,
                  value: (
                    <div className="  my-3 py-[3px]">
                      <p className=" text-sm line-clamp-2"> {item.sectionTitle}</p>
                    </div>
                  ),
                  type: 'video',
                }}
                selectedSection={selectedSectionId}
                onChange={(id: string) => {
                  setSelectedSectionId(id);
                  if (open) setOpen(false);
                }}
              />
            ))}
          </ul>
        </div>

        <div className=" flex-1">
          {!isLoading ? (
            <CourseOverviewSection
              sectionContent={selectedSection.sectionContent}
              sectionTitle={selectedSection.sectionTitle}
              _id={selectedSection._id}
            />
          ) : (
            <div className=" mt-20 w-fit  mx-auto">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
