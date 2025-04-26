import { Button } from '@mantine/core';
import Divider from './ui/divider';
import { Link, useNavigate, useParams } from '@tanstack/react-router';

export default function QuizResult({ score }: { score?: number }) {
  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const navigate = useNavigate();

  function handelNavigate() {
    navigate({ to: `/course/${params.courseSlug}/learn/${params.sectionId}/quiz/${params.lectureId}` });
  }
  return (
    <>
      <div className="lg:mt-32 mt-16 flex justify-between">
        <h1 className=" text-[24px] text-themeBlack font-semibold ">Submit your assignment</h1>
        {score && score < 80 ? (
          <Button onClick={handelNavigate}>Retake Assignment</Button>
        ) : score && score >= 80 ? (
          <Button onClick={handelNavigate} color="green">
            See Response
          </Button>
        ) : (
          <Button onClick={handelNavigate}>Start Assignment</Button>
        )}
      </div>
      <div className="mt-10 my-4">
        <Divider color=" border-[#EEEEEE]" />
      </div>

      <div className="mb-2  flex justify-between w-[96%]">
        <div>
          <h2 className=" text-[24px] text-themeBlack font-semibold mb-3 ">Receive Grade</h2>
          <span className=" text-lg text-themeGray  ">
            To pass <span>80% or higher</span>
          </span>
        </div>
        <div className="">
          <h2 className=" text-[24px] text-themeBlack font-semibold mb-3 ">Your Grade</h2>
          <span className=" text-lg font-semibold text-themeBlack ">
            {score ? score : '-'}
            {score ? ' %' : ''}
          </span>
        </div>
      </div>
    </>
  );
}
