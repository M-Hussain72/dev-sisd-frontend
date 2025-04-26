import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Footer from '../component/Footer';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../component/LandingPage';
import DashBoard from '../component/DashBoard';
import { z } from 'zod';

const searchSchema = z.object({
  tab: z.string().optional(),
  notify: z.string().optional(),
});
export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: searchSchema,
});
function Home() {
  const { isAuthenticate } = useAuth();
  return (
    <div>
      <div className=" xs:mx-8 mx-4">{isAuthenticate ? <DashBoard /> : <LandingPage />}</div>
    </div>
  );
}
