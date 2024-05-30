import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2015', // Ensure compatibility with older browsers
  },
  server: {
    port: 3000, // Specify the port where your frontend is running
    proxy: {
      '/api': {
        target: 'https://castmelocalbackend.onrender.com', // Backend URL for production
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
      },
    },
  },
});
