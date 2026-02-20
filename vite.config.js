import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Rutas relativas para S3 y otros servidores estáticos
  plugins: [react(), tailwindcss()],
  build: {
    // Aumenta el límite de advertencia ya que Three.js es pesado
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa Three.js en su propio chunk
          'three': ['three'],
          // Separa React Three Fiber/Drei en otro chunk
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          // Chunks para las dependencias de React
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
