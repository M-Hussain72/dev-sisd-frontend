import { createFileRoute } from '@tanstack/react-router';
import SuccessfulPurchased from '../component/SuccessfulPurchased';
import { RequireAuth } from '../component/helper/RequiredAuth';

export const Route = createFileRoute('/payment/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <SuccessfulPurchased />
    </RequireAuth>
  );
}
