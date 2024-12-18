import { createFileRoute, Link } from '@tanstack/react-router';
import Login from '../../component/Login';

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
});

function LoginComponent() {
  return <Login />;
}
