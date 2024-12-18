import * as React from 'react';
import { Link, Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../component/header';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import FooterBottom from '../component/FooterBottom';
import type { AuthContextType } from '../context/AuthContext';
import ScrollToTop from '../component/ScrollToTop';

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MantineProvider>
      <main className="  max-w-[1440px] bg-[#fafafa]  w-full mx-auto ">
        <Header />
        <ScrollToTop />
        <Outlet />
        <FooterBottom />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </MantineProvider>
  );
}
