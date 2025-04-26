import { createFileRoute } from '@tanstack/react-router';
import About from '../component/AboutUs';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <About />
    </>
  );
}
