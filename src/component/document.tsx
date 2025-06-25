import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { setLectureProgress } from '../http/courseHttp';
import { useParams, useRouteContext } from '@tanstack/react-router';
import { LectureProgressPayload } from '../interface/courseInterface';
import { MutateOptions } from '@tanstack/react-query';

export default function DocumentReading({
  article,
  isSeen,
  mutate,
}: {
  article: string;
  isSeen: boolean | undefined;
  mutate: (
    variables: LectureProgressPayload,
    options?: MutateOptions<void, Error, LectureProgressPayload, unknown> | undefined,
  ) => void;
}) {
  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const { authAxios } = useRouteContext({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });

  useEffect(() => {
    async function inti() {
      mutate({
        courseSlug: params.courseSlug,
        lectureId: params.lectureId,
        lectureType: 'article',
        userAnswers: null,
        authAxios,
        lastViewTime: null,
        assignment: null,
        completed: true,
      });
      return;
    }

    if (!isSeen) {
      inti();
    }
  }, []);

  return (
    <div className=" mx-auto min-h-[400px]  ">
      <ReactMarkdown
        className={
          ' prose-strong:font-semibold  prose-headings:mb-4 prose-sm text-themeGray prose-headings:text-themeBlack prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl   '
        }
      >
        {article}
      </ReactMarkdown>
    </div>
  );
}
