import { createFileRoute } from '@tanstack/react-router';
import CheckOut from '../component/Checkout';

export const Route = createFileRoute('/payment/checkout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CheckOut />;
}
