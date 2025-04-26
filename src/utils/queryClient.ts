// queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set any default options you want here
      refetchOnWindowFocus: false,
    },
  },
});
