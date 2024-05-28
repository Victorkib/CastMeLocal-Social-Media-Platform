import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target:
          import.meta.env.NODE_ENV === 'production'
            ? 'https://castmelocal.onrender.com'
            : 'http://localhost:5000',
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
