import { defineConfig, devices } from '@playwright/test'

// The production server in ../homeoremedica-server with the keys in its `.env`, so these tests use the
// real providers. The web app calls it from its own port.
const API_PORT = 8101
const API_URL = `http://127.0.0.1:${API_PORT}`
const WEB_PORT = 8103
const WEB_URL = `http://127.0.0.1:${WEB_PORT}`

export default defineConfig({
  testDir: 'e2e',
  testMatch: 'smoke.spec.ts',
  reporter: 'list',
  timeout: 120_000,
  expect: { timeout: 90_000 },
  use: { ...devices['Desktop Chrome'], baseURL: WEB_URL, trace: 'retain-on-failure' },
  webServer: [
    {
      command: 'npm start',
      cwd: '../homeoremedica-server',
      env: { PORT: String(API_PORT), WEB_ORIGINS: WEB_URL },
      url: `${API_URL}/api/health`,
      reuseExistingServer: false,
    },
    {
      command: `vite build && vite preview --host 127.0.0.1 --port ${WEB_PORT} --strictPort`,
      env: { VITE_API_ORIGIN: API_URL },
      url: WEB_URL,
      reuseExistingServer: false,
    },
  ],
})
