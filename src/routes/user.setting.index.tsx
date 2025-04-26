import { createFileRoute } from '@tanstack/react-router';
import Setting from '../component/setting';

export const Route = createFileRoute('/user/setting/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Setting />;
}
