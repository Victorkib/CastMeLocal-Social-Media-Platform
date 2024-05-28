import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://castmelocal.onrender.com', // Update to your backend URL
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure the output directory is 'dist'
  },
});
