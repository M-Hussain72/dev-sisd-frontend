import { useState } from 'react';

interface SectionType {
  id: string;
  value: string | React.ReactNode;
  type: 'video' | 'article' | 'assessment' | 'assignment';
}

export default ({
  section,
  selectedSection,
  onChange,
}: {
  section: SectionType;
  selectedSection: string;

  onChange: (id: string, type: 'video' | 'assessment' | 'article' | 'assignment') => void;
}) => {
  return (
    <li
      key={section.id}
      className={
        '  text-base text-wrap my-2 min-h-[50px] leading-[50px] capitalize ' +
        (selectedSection === section.id
          ? ' border-l-[5px]  pl-[10px] pr-[15px] border-l-themeBlue text-themeBlue cursor-default'
          : ' hover:pl-[10px] hover:border-l-[5px]  pl-[15px] pr-[15px] hover:border-l-[#94969790] hover:bg-[#9496972d]  text-themeGray   cursor-pointer')
      }
      onClick={() => onChange(section.id, section.type)}
    >
      {section.value}
    </li>
  );
};
