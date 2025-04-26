import CourseCard from './helper/CourseCard';
import { getCompleteCourse } from '../http/courseHttp';
import useAuthAxios from '../hook/useAuthAxios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export default function CompletedCourse() {
  const authAxios = useAuthAxios();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course/complete'],
    queryFn: () => getCompleteCourse({ authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 100 * 60 * 5,
  });

  console.log(data);

  return (
    <>
      {' '}
      {data && data?.length > 0 ? (
        <div className="  grid gap-8 grid-cols-1  min-[848px]:grid-cols-3  min-[1370px]:grid-cols-5  min-[1110px]:grid-cols-4  sm:grid-cols-2 ">
          {data.map((item) => (
            <CourseCard
              {...item.course}
              onClick={() => navigate({ to: `/course/${item.course.slug}/learn` })}
              isPaid={true}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center mx-2 p-8  bg-white border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 ">No courses Competed at the moment!</p>
        </div>
      )}
    </>
  );
}
