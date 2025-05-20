import { createFileRoute } from '@tanstack/react-router';
import CheckOut from '../component/Checkout';
import { RequireAuth } from '../component/helper/RequiredAuth';

export const Route = createFileRoute('/payment/checkout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <CheckOut />
    </RequireAuth>
  );
}
