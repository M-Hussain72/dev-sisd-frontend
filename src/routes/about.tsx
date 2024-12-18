import * as React from 'react';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticate) {
      redirect({
        to: '/login',
      });
    }
  },
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
      <Link
        to="/courses"
        search={{
          category: 'design',
        }}
      >
        {' '}
        hi I am Link Where You finding me!
      </Link>
    </div>
  );
}
