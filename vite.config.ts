import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  // `npm run dev` in ../homeoremedica-server serves the API here.
  server: { proxy: { '/api': 'http://127.0.0.1:8000' } },
  test: {
    restoreMocks: true,
    include: ['src/web/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/web/test/setup.ts'],
  },
})
