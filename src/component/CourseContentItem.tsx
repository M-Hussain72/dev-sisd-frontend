import VideoIcon from '../assets/VideoIcon';
import ReadingIcon from '../assets/ReadingIcon';
import QuizIcon from '../assets/QuizIcon';
import CompleteIcon from '../assets/CompleteIcon';
import { Link, useNavigate } from '@tanstack/react-router';
import PreviewModal from './CourseDetailComponent/PreviewModal';
import formatTime from '../utils/formatTime';
import { useState } from 'react';

export interface ContentItemType {
  _id: string;
  isCompleted: boolean;
  title: string;
  type: 'article' | 'video' | 'assessment' | 'assignment';
  duration: number;
  isSideBar?: boolean;
  purchased: boolean;
  preview: boolean;
  courseId: string;
  selected: boolean;
}

export default ({
  courseId,
  _id,
  isCompleted,
  title,
  type,
  duration,
  isSideBar,
  purchased = false,
  preview = false,
  selected = false,
}: ContentItemType) => {
  const [opened, setOpened] = useState(false);

  let width = '18',
    height = '19';
  if (isSideBar) {
    width = '14';
    height = '14';
  }

  let icon = <ReadingIcon w={width} h={height} />;

  if (type === 'video') {
    icon = <VideoIcon w={width} h={height} />;
  }
  if (type === 'assessment') {
    icon = <QuizIcon w={width} h={height} />;
  }

  return (
    <div key={_id} className={' flex flex-1   py-[3px] items-center  ' + (!isSideBar ? ' gap-4 ' : ' gap-3 ')}>
      <div>{isCompleted ? <CompleteIcon w={width} h={height} /> : icon}</div>
      <div className={' flex flex-1  justify-between'}>
        <div>
          <h3
            className={
              ' line-clamp-2  pr-1 ' +
              (selected ? ' text-themeBlue ' : ' text-themeGray6 ') +
              (!isSideBar ? ' text-lg ' : ' text-sm')
            }
          >
            {title}
          </h3>

          <span
            className={
              ' font-light pt-1  capitalize line-clamp-1 ' +
              (selected ? ' text-themeBlue ' : ' text-themeGray ') +
              (!isSideBar ? ' text-sm ' : ' text-[12px] leading-4')
            }
          >
            {type} {type === 'video' && 'Lecture'}
          </span>
        </div>
        {type === 'video' && (
          <div className=" flex items-center gap-4">
            {!purchased && (
              <PreviewModal preview={preview} courseId={courseId} videoId={_id} opened={opened} setOpened={setOpened} />
            )}
            <p className={' text-themeGray line-clamp-1 w-[45px] ' + (!isSideBar ? ' text-base ' : 'text-xs mt-1')}>
              {formatTime(duration)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
