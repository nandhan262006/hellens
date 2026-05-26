import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
  },
  esbuild: {
    legalComments: 'none',
  },
})
