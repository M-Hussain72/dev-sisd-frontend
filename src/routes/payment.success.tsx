import { createFileRoute } from '@tanstack/react-router';
import SuccessfulPurchased from '../component/SuccessfulPurchased';

export const Route = createFileRoute('/payment/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SuccessfulPurchased />;
}
