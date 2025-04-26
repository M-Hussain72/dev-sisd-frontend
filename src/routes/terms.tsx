import { createFileRoute } from '@tanstack/react-router';
import TermsOfUse from '../component/TermsOfUse';

export const Route = createFileRoute('/terms')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TermsOfUse />;
}
