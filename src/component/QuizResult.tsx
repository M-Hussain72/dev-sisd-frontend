import { Button } from '@mantine/core';
import Divider from './ui/divider';
import { useNavigate, useParams } from '@tanstack/react-router';

export default function QuizResult({ score }: { score?: number }) {
  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const navigate = useNavigate();

  function handelNavigate() {
    navigate({ to: `/course/${params.courseSlug}/learn/${params.sectionId}/quiz/${params.lectureId}` });
  }
  return (
    <div className=" sm:p-4">
      <div className="lg:mt-20 mt-12 flex justify-between">
        <h1 className=" sm:text-[24px] text-lg text-themeBlack font-semibold ">Submit your Quiz</h1>
        {score && score < 80 ? (
          <Button onClick={handelNavigate}>Retake Quiz</Button>
        ) : score && score >= 80 ? (
          <Button onClick={handelNavigate} color="green">
            See Response
          </Button>
        ) : (
          <Button onClick={handelNavigate}>Start Quiz</Button>
        )}
      </div>
      <div className=" sm:mt-16 mt-10 my-4">
        <Divider color=" border-[#EEEEEE]" />
      </div>

      <div className="sm:mb-16  mb-10  flex justify-between w-[96%]">
        <div>
          <h2 className=" sm:text-[24px] text-lg text-themeBlack font-semibold sm:mb-3 mb-1 ">Receive Grade</h2>
          <span className=" sm:text-lg text-sm text-themeGray  ">
            To pass <span>80% or higher</span>
          </span>
        </div>
        <div className="">
          <h2 className=" sm:text-[24px] text-lg text-themeBlack font-semibold mb-3 ">Your Grade</h2>
          <span className=" sm:text-lg text-base font-semibold text-themeBlack ">
            {score ? score : '-'}
            {score ? ' %' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
