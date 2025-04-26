import { createFileRoute, useSearch } from '@tanstack/react-router';
import { z } from 'zod';
import SearchPage from '../component/SearchPage';

// const searchSchema = z.object({
//   search: z.string().optional(), // `search` is an optional string
//   category: z.string().optional(), // `type` is an optional string
// })

export const Route = createFileRoute('/courses/search/$search/')({
  component: RouteComponent,
  // validateSearch: searchSchema,
});

function RouteComponent() {
  return (
    <>
      <SearchPage />
    </>
  );
}
