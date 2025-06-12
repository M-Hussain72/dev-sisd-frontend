import { createFileRoute, notFound, Outlet, redirect, useMatch } from '@tanstack/react-router';
import CourseLessonPage from '../component/CourseLessonPage';
import { fetchCourse } from '../http/courseHttp';
import { queryClient } from '../app';
import { Loader } from '@mantine/core';
import NotFound from '../component/helper/NotFound';
import { RequireAuth } from '../component/helper/RequiredAuth';
import axios from 'axios';

export const Route = createFileRoute('/course/$courseSlug/learn/$sectionId/lecture')({
  loader: async ({ context: { authAxios }, params }) => {
    try {
      const course = await queryClient.ensureQueryData({
        queryKey: ['course', params.courseSlug],
        queryFn: () =>
          fetchCourse({
            courseSlug: params.courseSlug!,
            authAxios,
          }),
      });

      // If your fetchCourse might return null for a non-existent slug…
      if (!course) {
        throw notFound();
      }

      return { course };
    } catch (error: any) {
      // Axios‐specific handling
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 404) {
          // Not found on the API side
          throw notFound();
        }
        if (status === 401) {
          // Unauthorized—kick user to login
          redirect({ to: '/login' });
        }
      }

      // You can detect Remix RouteErrorResponse too, if you throw those elsewhere:
    }
  },

  pendingComponent: () => (
    <div className=" h-[400px]">
      <div className=" mt-16 w-fit mx-auto">
        <Loader size={'xl'} />
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <NotFound
      message={`We're sorry, but the course you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
    />
  ),

  component: RouteComponent,
  pendingMs: 1000, // Wait 1 second before showing the pending component
  pendingMinMs: 500,
  staleTime: Infinity,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const params = Route.useParams();
  // const findSection = data.course.content.find((item) => item._id === params.sectionId);
  // const currentSection = findSection ? findSection : data.course.content[0];
  if (!data) {
    return (
      <NotFound
        message={`We're sorry, but the course you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
      />
    );
  }

  const match = useMatch({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });

  return (
    <>
      <RequireAuth>
        <CourseLessonPage
          sections={data?.course.content || []}
          // courseSection={currentSection}
          initialLectureId={match.params.lectureId}
        />
      </RequireAuth>
    </>
  );
}
