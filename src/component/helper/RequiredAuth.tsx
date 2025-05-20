// src/components/RequireAuth.tsx
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

interface RequireAuthProps {
  children: React.ReactNode;
}
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      // redirect to home:
      navigate({ to: '/' });
      // — or throw a 404 in TanStack Router:
      // throw new RouteError({ status: 404, message: 'Not Found' })
    }
  }, [isAuthenticate, navigate]);

  // While we’re waiting on the redirect, render nothing:
  if (!isAuthenticate) return null;

  // user is logged in → show the child route
  return <>{children}</>;
}
