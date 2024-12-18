import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';
import AuthProvider, { useAuth } from './context/AuthContext';
import CartProvider from './context/CartContext';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
});

// Register things for typeSafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function InnerApp() {
  const auth = useAuth();
  console.log(auth);
  return <RouterProvider router={router} context={{ auth }} />;
}

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <InnerApp />
          </QueryClientProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
