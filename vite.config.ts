import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  server: {
    host: '0.0.0.0', // Allows connections from the network
    port: 5173, // Ensure this matches your actual port
  },
});
