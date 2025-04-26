import { createFileRoute, notFound } from '@tanstack/react-router';
import CourseLessonPage from '../component/CourseLessonPage';
import { fetchLecture, setLectureProgress } from '../http/courseHttp';
import { queryClient } from '../app';
import VideoPlayer from '../component/videoPlayer';
import QuizResult from '../component/QuizResult';
import DocumentReading from '../public/document';
import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import NotFound from '../component/helper/NotFound';
import { useLectureNav } from '../context/LectureNavigationContext';
import { useEffect } from 'react';

export const Route = createFileRoute('/course/$courseSlug/learn/$sectionId/lecture/$lectureId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { authAxios } = Route.useRouteContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lecture', params.lectureId],
    queryFn: async () => await fetchLecture({ ...params, authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 6000,
    gcTime: 0,
  });

  const { handleForwardLecture } = useLectureNav();

  if (isLoading) {
    return (
      <div className="  aspect-video max-h-[580px] bg-white border-[1px] rounded-xl flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }
  if (isError) {
    return (
      <NotFound
        message={`We're sorry, but the course you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
      />
    );
  }

  async function handleLectureProgress({ lastViewTime, completed }: { lastViewTime: number; completed: boolean }) {
    console.log('completed', completed);
    await setLectureProgress({
      courseSlug: params.courseSlug,
      lectureId: params.lectureId,
      authAxios,
      lastViewTime: lastViewTime,
      completed: completed,
      userAnswers: null,
      lectureType: data?.lecture?.type || 'video',
    });
    if (completed) {
      console.log('completed', completed);

      handleForwardLecture();
    }
  }

  return (
    <>
      <div className="w-full max-w-[1025px] mt-2 md:max-h-[580px] h-auto overflow-scroll  border-[1px] border-[#EEEEEE]  rounded-xl ">
        {data?.lecture?.type === 'video' ? (
          <div className=" max-h-[580px]  ">
            <VideoPlayer
              key={params.lectureId}
              id={params.lectureId}
              url={data.lecture?.video ? data.lecture?.video : ''}
              previewMode={false}
              setLectureProgress={handleLectureProgress}
              startTime={data.progress ? data.progress.last_watched_second : 0}
            />
          </div>
        ) : data?.lecture?.type === 'assessment' ? (
          <div className="p-2">
            <QuizResult score={data.progress?.quizScore}></QuizResult>
          </div>
        ) : data?.lecture?.type === 'article' ? (
          <div className=" p-3  shadow-inner shadow-black/20 rounded-xl">
            {' '}
            <DocumentReading article={data?.lecture?.article || ' Oops Empty File'} />
          </div>
        ) : (
          <div> Lecture Not Found! Skip This lecture.</div>
        )}
      </div>
    </>
  );
}
