import { createFileRoute } from '@tanstack/react-router';
import BlogDetail from '../component/blogDetail';

export const Route = createFileRoute('/blogs/$slug/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlogDetail />;
}
