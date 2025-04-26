import { createFileRoute } from '@tanstack/react-router';
import PrivacyPolicy from '../component/PrivacyPolicy';

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PrivacyPolicy />;
}
