import { createFileRoute, notFound } from '@tanstack/react-router';
import CourseLessonPage from '../component/CourseLessonPage';
import { fetchLecture, setLectureProgress } from '../http/courseHttp';
import VideoPlayer from '../component/videoPlayer';
import QuizResult from '../component/QuizResult';
import DocumentReading from '../component/document';
import { Loader } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import NotFound from '../component/helper/NotFound';
import { useLectureNav } from '../context/LectureNavigationContext';
import { CourseIn, LectureProgressPayload } from '../interface/courseInterface';
import AssignmentPage from '../component/AssignmentPage';

export const Route = createFileRoute('/course/$courseSlug/learn/$sectionId/lecture/$lectureId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { authAxios } = Route.useRouteContext();
  const { handleForwardLecture, handlePrevLecture } = useLectureNav();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lecture', params.lectureId],
    queryFn: async () => await fetchLecture({ ...params, authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 6000,
    gcTime: 0,
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      courseSlug,
      lectureId,
      authAxios,
      lastViewTime,
      completed,
      userAnswers,
      lectureType,
      assignment,
    }: LectureProgressPayload) => {
      await setLectureProgress({
        courseSlug,
        lectureId,
        authAxios,
        lastViewTime,
        completed,
        userAnswers,
        lectureType,
        assignment,
      });
    },
  });

  if (isLoading) {
    return (
      <div className=" w-full max-w-[1025px] aspect-video max-h-[580px] bg-white border-[1px] rounded-xl flex items-center justify-center">
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
    await setLectureProgress({
      courseSlug: params.courseSlug,
      lectureId: params.lectureId,
      authAxios,
      lastViewTime: lastViewTime,
      completed: completed,
      userAnswers: null,
      assignment: null,
      lectureType: data?.lecture?.type || 'video',
    });
    // if (completed) {
    //   console.log('completed', completed);

    //   handleForwardLecture();
    // }
  }
  return (
    <>
      <div className="w-full  max-w-[1025px] mt-2 md:max-h-[580px] h-auto shadow-inner shadow-black/20 overflow-scroll  border-[1px] border-[#EEEEEE] bg-white  xs:rounded-xl ">
        {data?.lecture?.type === 'video' ? (
          <div className=" max-h-[580px]  ">
            <VideoPlayer
              key={params.lectureId}
              id={params.lectureId}
              courseSlug={params.courseSlug}
              sectionId={params.sectionId}
              url={data.lecture?.video ? data.lecture?.video : ''}
              previewMode={false}
              setLectureProgress={handleLectureProgress}
              startTime={data.progress ? data.progress.last_watched_second : 0}
              handleForwardLecture={handleForwardLecture}
              handlePrevLecture={handlePrevLecture}
            />
          </div>
        ) : data?.lecture?.type === 'assessment' ? (
          <div className="sm:p-5 px-6 lg:min-h-[500px] sm:min-h-[400px] max-h-[310px]">
            <QuizResult score={data.progress?.quizScore}></QuizResult>
          </div>
        ) : data?.lecture?.type === 'article' ? (
          <div className=" p-3 px-4">
            {' '}
            <DocumentReading
              article={data?.lecture?.article || ' Oops Empty File'}
              isSeen={data?.progress?.completed}
              mutate={mutate}
            />
          </div>
        ) : data?.lecture?.type === 'assignment' ? (
          <div className="sm:p-5 p-2  relative lg:min-h-[500px] sm:min-h-[400px] max-h-[310px] overflow-scroll  ">
            <AssignmentPage
              assignment={{
                title: data?.lecture?.title,
                startedAt: data?.progress?.assignment?.startedAt || new Date(),
                ...data?.lecture?.assignment,
                isFeedbackDone: !!data?.progress?.assignment?.isFeedbackDone,
                score: data?.progress?.assignment?.score,
                feedback: data?.progress?.assignment?.feedback,
              }}
              timeStarted={!!data?.progress?.assignment?.startedAt}
              mutate={mutate}
              resSubmit={!!data?.progress?.assignment?.fileUrl}
            />
          </div>
        ) : (
          <div> Lecture Not Found! Skip This lecture.</div>
        )}
      </div>
    </>
  );
}
