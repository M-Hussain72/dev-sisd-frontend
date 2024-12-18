import { createFileRoute } from '@tanstack/react-router';
import Cart from '../component/Cart';
import Footer from '../component/Footer';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Cart />
      <Footer />
    </>
  );
}
