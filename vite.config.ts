import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
    build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 250,
        rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./src/index.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./src/privacy.html', import.meta.url))
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
