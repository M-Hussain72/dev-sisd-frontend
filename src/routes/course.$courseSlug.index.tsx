import { createFileRoute, notFound } from '@tanstack/react-router';
import CourseDetail from '../component/CourseDetail';
import { queryClient } from '../app';
import { fetchCourse } from '../http/courseHttp';
import NotFound from '../component/helper/NotFound';
import { Loader } from '@mantine/core';
import CourseDashboard from '../component/CourseDashboard';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/course/$courseSlug/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const data = Route.useLoaderData();
  const params = Route.useParams();
  const { authAxios } = Route.useRouteContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', params.courseSlug], // Query key
    queryFn: () => fetchCourse({ courseSlug: params.courseSlug, authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className=" h-[400px]">
        <div className=" mt-16 w-fit mx-auto">
          <Loader size={'xl'} />
        </div>
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
  // if (data?.subscribe) {
  //   return (
  //     <>
  //       <CourseDashboard {...data} />
  //     </>
  //   );
  // }

  if (!data) {
    return (
      <NotFound
        message={`We're sorry, but the course you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
      />
    );
  }

  return (
    <>
      <CourseDetail {...data} />
    </>
  );
}
