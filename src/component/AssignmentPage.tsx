import { useNavigate, useParams, useRouteContext } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import AssignmentSubmission from './AssignmentSubmission';
import { LectureProgressPayload } from '../interface/courseInterface';
import { MutateOptions } from '@tanstack/react-query';
import { formatDate } from '../utils/formatTime';

export default function AssignmentPage({
  assignment,
  timeStarted,
  resSubmit,
  mutate,
}: {
  assignment: {
    title: string;
    description: string;
    startedAt: Date;
    submitWithinDays: number;
    fileUrl: string;
  };
  timeStarted: boolean;
  resSubmit: boolean;
  mutate: (
    variables: LectureProgressPayload,
    options?: MutateOptions<void, Error, LectureProgressPayload, unknown> | undefined,
  ) => void;
}) {
  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const { authAxios } = useRouteContext({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const [started, setStarted] = useState(timeStarted);

  const navigate = useNavigate();

  function handelNavigate() {
    navigate({ to: `/course/${params.courseSlug}/learn/${params.sectionId}/quiz/${params.lectureId}` });
  }

  const now = new Date();
  const availableAt = new Date(assignment?.startedAt);

  const deadline = useMemo(() => {
    return new Date(availableAt.getTime() + assignment?.submitWithinDays * 86400000);
  }, [assignment]);

  const isExpired = now > deadline;

  async function handelStartedAssignment() {
    await mutate({
      courseSlug: params.courseSlug,
      lectureId: params.lectureId,
      lectureType: 'assignment',
      userAnswers: null,
      authAxios,
      lastViewTime: null,
      assignment: {
        startedAt: availableAt,
        fileUrl: null,
      },
      completed: false,
    });
    setStarted(true);
  }

  if (!started) {
    return (
      <div className=" min-h-[300px] mx-auto">
        {/* <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1> */}
        <h3 className=" font-bold text-xl mb-4">Assignment Instruction</h3>
        <p className="mb-8 whitespace-pre-line">{assignment.description}</p>
        <div className=" absolute bottom-0 left-0 px-4 pt-2 right-0 flex items-center  justify-between gap-6 bg-slate-300">
          <p className={'mb-6 mt-1 ' + (isExpired && 'text-red-600')}>
            <span className=" font-bold xs:text-base text-sm ">Deadline:</span>{' '}
            {/* <time dateTime={deadline.toISOString()}>
              {deadline.toLocaleString('en-US', {
                hour12: false,
              })}
            </time> */}
            <span>{formatDate(deadline)}</span>
            {!isExpired && (
              <p className=" text-xs">
                (<span className="text-themeBlue">Info</span>: If Start Now then this Date Apply)
              </p>
            )}
          </p>
          {isExpired ? (
            <p className="text-red-600">⚠️ This assignment has expired.</p>
          ) : (
            <div>
              <button
                className="bg-blue-600 xs:text-base text-sm text-white px-4 py-2 rounded"
                onClick={handelStartedAssignment}
              >
                Start Assignment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <AssignmentSubmission assignment={assignment} mutate={mutate} resSubmit={resSubmit} />
    </>
  );
}
