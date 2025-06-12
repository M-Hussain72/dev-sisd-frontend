import { useState } from 'react';
import VideoPlayer from '../videoPlayer';
import formatTime from '../../utils/formatTime';

function getThumbnail(videoUrl: string) {
  const urlParts = videoUrl.split('/upload/');
  if (urlParts.length !== 2) return videoUrl; // Return original if format is incorrect

  return (
    <img
      className=" w-[80px] h-auto "
      src={`${urlParts[0]}/upload/so_2,vc_auto,w_320,h_180,c_fill/${urlParts[1].replace('.mp4', '.jpg')}`}
    ></img>
  );
}

interface previewCourse {
  id: string;
  title: string;
  video: string;
  duration: number;
}

export default function PreviewSection({
  previewVideos,
  videoId,
}: {
  previewVideos: previewCourse[];
  videoId: string | undefined;
}) {
  const initialIndex = videoId ? previewVideos.findIndex((item) => item.id === videoId) : 0;
  const [currentPlay, setCurrentPlay] = useState(previewVideos[initialIndex]);
  return (
    <div className=" mt-4">
      <div className=" max-h-[340px] rounded-lg overflow-hidden">
        <VideoPlayer
          key={videoId || ''}
          url={currentPlay.video}
          previewMode={true}
          setLectureProgress={() => undefined}
          startTime={0}
          id={`${videoId}`}
        />
      </div>
      <div className=" mt-6">
        <h2 className=" text-themeBlack font-semibold">Free Sample Videos:</h2>
        <ul className=" mt-4 ">
          {previewVideos.length > 0 &&
            previewVideos.map((item, index) => (
              <>
                <li
                  onClick={() => {
                    setCurrentPlay(item);
                  }}
                  id={item.id}
                  className={
                    ' flex gap-4 py-4 p-2 justify-between items-center cursor-pointer ' +
                    (item.id === currentPlay.id && 'bg-[#7aadeb75]')
                  }
                >
                  <div className="flex gap-4  items-center">
                    {/* {getThumbnail(item.video)} */}
                    <div className=" font-bold text-themeBlack">{item.title}</div>
                  </div>
                  <div style={{ color: '#666' }}>{formatTime(item.duration)}</div>
                </li>
                {4 != index + 1 && <div className=" border-b-[1px]"></div>}
              </>
            ))}
        </ul>
      </div>
    </div>
  );
}
