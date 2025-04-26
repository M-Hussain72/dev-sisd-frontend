import { useState } from 'react';
import CourseSection from '../CourseSection';
import CourseContentItem, { ContentItemType } from '../CourseContentItem';
import { ContentIn } from '../../interface/courseInterface';

export default function CourseContent({ content, courseId }: { content: ContentIn[]; courseId: string }) {
  const [selectedSection, setSelectedSection] = useState<string[]>([content ? content[0]._id : '']);
  console.log('content:');
  console.log(content);

  const handleSelectedSection = (sectionId: string) => {
    setSelectedSection((prev) => {
      const index = prev.indexOf(sectionId);
      if (index > -1) {
        return prev.filter((id) => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  console.log(content);
  return (
    <>
      <div className="max-w-[1040px] mt-6 ">
        {content?.map((section) => {
          const isOpen = selectedSection?.includes(section._id);

          return (
            <li key={section._id} className=" list-none border-[1px]  rounded-xl mb-8  ">
              <div
                onClick={() => handleSelectedSection(section._id)}
                className=" flex p-6 items-center justify-between cursor-pointer  "
              >
                <div>
                  <h1 className=" text-[#2B2B2B] text-2xl font-semibold ">{section.sectionTitle}</h1>
                </div>
                <svg
                  className={'  ' + (isOpen ? ' rotate-180' : ' rotate-0')}
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5.5L0 1.25972L0.716667 0.5L4 3.99823L7.28333 0.517668L8 1.27739L4 5.5Z"
                    fill="#484849"
                    fill-opacity="0.45"
                  />
                </svg>
              </div>
              <div
                className={`transition-all  overflow-hidden ${
                  isOpen ? 'max-h-[3000px] opacity-100 ' : 'max-h-0 opacity-0 '
                }`}
              >
                <div className=" px-6 space-y-2">
                  {section.sectionContent.map((item) => (
                    <CourseContentItem purchased={false} key={item._id} {...item} courseId={courseId} selected={false} />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}
