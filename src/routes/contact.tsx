import { createFileRoute } from '@tanstack/react-router';
import Cart from '../component/Cart';
import Footer from '../component/Footer';
import Contact from '../component/Contact';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Contact />
    </>
  );
}
