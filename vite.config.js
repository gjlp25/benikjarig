// vite.config.js — benikvandaagjarig.nl

import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild'
  },
  server: {
    open: true
  }
});
