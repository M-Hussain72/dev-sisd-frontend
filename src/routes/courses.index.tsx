import * as React from 'react';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { z } from 'zod';
import CoursesPage from '../component/CoursesPage.tsx';
import Footer from '../component/Footer.tsx';

const searchSchema = z.object({
  search: z.string().optional(), // `search` is an optional string
  category: z.string().optional(), // `type` is an optional string
});

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
  validateSearch: searchSchema,
});
function RouteComponent() {
  const { search, category } = useSearch({
    from: '/courses/',
  });
  return (
    <>
      <CoursesPage />
      <Footer />
    </>
  );
}
