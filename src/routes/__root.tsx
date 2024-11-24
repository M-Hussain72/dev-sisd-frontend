import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../component/header';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MantineProvider>
      <div className="  max-w-[1440px] w-full mx-auto ">
        <Header />
        <Outlet />
        <div> HI I am FOOTER </div>
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    </MantineProvider>
  );
}
