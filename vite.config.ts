import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    // Images are never baked into the code as text: 20+ client logos made every page's code ~80 KB heavier.
    // As separate files they download only on pages that show them (9 Oct 2026). Small SVGs still inline.
    assetsInlineLimit: (filePath) => (filePath.endsWith('.svg') ? undefined : false),
    // Lets scripts/prerender.mjs check that the live pages need no stylesheet beyond the main one
    manifest: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  }
});
