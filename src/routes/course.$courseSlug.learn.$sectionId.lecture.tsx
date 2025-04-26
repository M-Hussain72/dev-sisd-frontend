import { createFileRoute, notFound, Outlet, useMatch } from '@tanstack/react-router';
import CourseLessonPage from '../component/CourseLessonPage';
import { fetchCourse } from '../http/courseHttp';
import { queryClient } from '../app';
import { Loader } from '@mantine/core';
import NotFound from '../component/helper/NotFound';

export const Route = createFileRoute('/course/$courseSlug/learn/$sectionId/lecture')({
  loader: async ({ context: { authAxios }, params }) => {
    const course = await queryClient.ensureQueryData(
      {
        queryKey: ['course', params.courseSlug], // Query key
        queryFn: () => fetchCourse({ courseSlug: params.courseSlug, authAxios }),
      }, // Fetcher function
    );
    if (!course) {
      throw notFound();
    }

    // Return the data; it will be accessible in your component.
    return { course };
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
  const findSection = data.course.content.find((item) => item._id === params.sectionId);
  const currentSection = findSection ? findSection : data.course.content[0];

  const match = useMatch({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });

  return (
    <>
      <CourseLessonPage courseSection={currentSection} initialLectureId={match.params.lectureId} />
    </>
  );
}
