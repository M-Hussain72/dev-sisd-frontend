import CourseCard from './helper/CourseCard';
import { getUserLearningCourses } from '../http/courseHttp';
import useAuthAxios from '../hook/useAuthAxios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Loader } from '@mantine/core';
import userHttp from '../http/userHttp';

export default function MyLearning() {
  const authAxios = useAuthAxios();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course/paid'],
    queryFn: () => getUserLearningCourses({ authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 100 * 60 * 5,
  });
  if (isLoading) {
    return (
      <div className=" mt-8 my-12 w-fit mx-auto ">
        <Loader size={'xl'} className="" />
      </div>
    );
  }

  async function handleClick(slug: string) {
    const res = await userHttp.getUserCourseProgress({ authAxios, courseSlug: slug });
    if (!res) {
      navigate({ to: `/course/${slug}/learn` });
    }
    navigate({ to: `/course/${slug}/learn?sectionId=${res?.sectionId}&lectureId=${res?.lectureId}` });
  }

  return (
    <div className=" min-h-dvh">
      {' '}
      {data && data?.length > 0 ? (
        <div className="  grid gap-4 grid-cols-1  min-[848px]:grid-cols-3  min-[1370px]:grid-cols-5  min-[1110px]:grid-cols-4  sm:grid-cols-2  ">
          {data.map((item) => (
            <CourseCard
              key={item.course?._id}
              {...item.course}
              onClick={() => handleClick(item.course.slug)}
              isPaid={true}
              percentageComplete={item.percentageComplete}
              hasReviewed={item.hasReviewed}
              reviewId={item.reviewId}
            />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-[600px] mx-auto text-center  p-8 mt-[10%] bg-white border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 ">No courses Buy at the moment!</p>
        </div>
      )}
    </div>
  );
}
