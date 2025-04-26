import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../component/Header';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import FooterBottom from '../component/FooterBottom';
import type { AuthContextType } from '../context/AuthContext';
import ScrollToTop from '../utils/ScrollToTop';
import 'video.js/dist/video-js.css';
import Footer from '../component/Footer';
import { AxiosInstance } from 'axios';

interface MyRouterContext {
  auth: AuthContextType;
  authAxios: AxiosInstance;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MantineProvider>
      <main className="flex flex-col min-h-screen max-w-[1440px] bg-[#fafafa] w-full mx-auto">
        <Header />
        <ScrollToTop />

        {/* this will expand to fill any extra space */}
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
        <FooterBottom />

        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </MantineProvider>
  );
}
