import { createFileRoute } from '@tanstack/react-router';
import CourseDetail from '../component/CourseDetail';
import Footer from '../component/Footer';

export const Route = createFileRoute('/courses/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CourseDetail />
      <Footer />
    </>
  );
}
