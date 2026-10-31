import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /prax.exp/. Change to '/' if moved to its own domain.
  base: '/prax.exp/',
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
})
