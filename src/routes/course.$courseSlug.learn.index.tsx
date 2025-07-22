import { createFileRoute } from '@tanstack/react-router';
import CourseDashboard from '../component/CourseDashboard';
import NotFound from '../component/helper/NotFound';
import { Loader } from '@mantine/core';
import { fetchCourse } from '../http/courseHttp';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { RequireAuth } from '../component/helper/RequiredAuth';

const SchemaSection = z.object({
  sectionId: z.string().optional(), // `search` is an optional string
  lectureId: z.string().optional(),
});

export const Route = createFileRoute('/course/$courseSlug/learn/')({
  component: RouteComponent,
  validateSearch: SchemaSection,
});

function RouteComponent() {
  // const data = Route.useLoaderData();
  const params = Route.useParams();
  const { authAxios } = Route.useRouteContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course/learn', params.courseSlug], // Query key
    queryFn: () => fetchCourse({ courseSlug: params.courseSlug, authAxios }),
    refetchOnWindowFocus: false,
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
  if (!data?.subscribe) {
    return (
      <div className="mb-[13%]  px-10 my-10 max-w-[800px] ">
        <h1 className=" mt-[30px] text-4xl text-themeBlack">403-Access Denied</h1>
        <h1 className=" text-themeBlack font-semibold mt-6 text-2xl  ">
          Please subscribe or purchase the course to access the full content.
        </h1>
      </div>
    );
  }

  return (
    <RequireAuth>
      <CourseDashboard {...data} />
    </RequireAuth>
  );
}
