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
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' }))
  },
  server: {
    open: true
  }
});
