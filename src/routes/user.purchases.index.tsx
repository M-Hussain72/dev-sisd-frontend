import { createFileRoute } from '@tanstack/react-router';
import UserPurchase from '../component/UserPurchases';

export const Route = createFileRoute('/user/purchases/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserPurchase />;
}
