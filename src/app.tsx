import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider, { useAuth } from './context/AuthContext';
// import CartProvider from './context/CartContext';
import PaymentProvider from './context/paymentContext';
import useAuthAxios from './hook/useAuthAxios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
    authAxios: undefined!,
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
  const authAxios = useAuthAxios();
  console.log(auth);
  return <RouterProvider router={router} context={{ auth, authAxios }} />;
}

export const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <AuthProvider>
        <GoogleOAuthProvider clientId={'710921412481-no7jd703i7r50sg6tskn2mdro9s1aepd.apps.googleusercontent.com'}>
          {/* <CartProvider> */}
          <PaymentProvider>
            <QueryClientProvider client={queryClient}>
              <InnerApp />
            </QueryClientProvider>
          </PaymentProvider>
          {/* </CartProvider> */}
        </GoogleOAuthProvider>
      </AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={8000} // Auto-close after 5 seconds (optional)
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
      />
    </>
  );
}
