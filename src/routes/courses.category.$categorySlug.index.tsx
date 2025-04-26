import { createFileRoute } from '@tanstack/react-router';
import CoursesPage from '../component/CoursesPage';

export const Route = createFileRoute('/courses/category/$categorySlug/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { categorySlug } = Route.useParams();
  return (
    <>
      <CoursesPage />
    </>
  );
}
