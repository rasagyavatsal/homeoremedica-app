import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    restoreMocks: true,
    include: ['src/web/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/web/test/setup.ts'],
  },
})
