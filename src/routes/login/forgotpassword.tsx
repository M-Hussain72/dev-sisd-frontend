import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ForgotPasswordPage from '../../component/ForgotPasswordPage';
import z from 'zod';

const forgetSchema = z.object({
  source: z.preprocess(
    (raw) => {
      // only accept "panel", otherwise fallback to "customer"
      return raw === 'panel' ? 'panel' : 'customer';
    },
    z.enum(['panel', 'customer']),
  ),
});

export const Route = createFileRoute('/login/forgotpassword')({
  component: RouteComponent,
  validateSearch: forgetSchema,
});

function RouteComponent() {
  return <ForgotPasswordPage />;
}
