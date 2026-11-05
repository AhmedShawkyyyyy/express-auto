import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site lives at /express-auto/.
  // Set automatically by GitHub Actions during deploy builds.
  base: process.env.GITHUB_ACTIONS ? '/express-auto/' : '/',
  plugins: [react(), tailwindcss()],
})
