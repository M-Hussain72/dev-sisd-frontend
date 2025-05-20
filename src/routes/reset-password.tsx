import { createFileRoute } from '@tanstack/react-router';
import ResetPassword from '../component/ResetPassword';
import { z } from 'zod';

const resetSchema = z.object({
  token: z.string().optional(),
  source: z.enum(['panel', 'customer']).default('customer').optional(),
  // `search` is an optional string
});

export const Route = createFileRoute('/reset-password')({
  validateSearch: resetSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { token, source } = Route.useSearch();

  if (!token) {
    return (
      <h1 className=" mx-auto my-[15%] w-fit sm:text-2xl px-4 text-lg text-themeGray6 ">
        {' '}
        Oops! You are not currently authorized to reset the password.
      </h1>
    );
  }
  return <ResetPassword token={token} source={source} />;
}
