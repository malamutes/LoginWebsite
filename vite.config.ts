import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    minify: 'terser',
    outDir: 'dist',
    sourcemap: false,
  },
})
