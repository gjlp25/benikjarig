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
        main: 'src/index.html',
        privacy: 'src/privacy.html'
      }
    }
  },
  server: {
    open: true
  }
});