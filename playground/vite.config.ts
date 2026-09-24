import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash, debugId }) => {
        return debugId ? `${debugId}_${hash}` : `abbes_${hash}`;
      },
    }),
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@abbes-ui/react': new URL('../packages/react/src', import.meta.url).pathname,
    },
  },
});
