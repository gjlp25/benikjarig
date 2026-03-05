import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 50,
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy.html'
      }
    }
  },
  server: {
    open: true
  }
});