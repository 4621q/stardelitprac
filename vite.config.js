import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stardelitprac/',  // Correct base path for GitHub Pages
  server: {
    proxy: {
      '/api': {
        target: 'https://www.omdbapi.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
