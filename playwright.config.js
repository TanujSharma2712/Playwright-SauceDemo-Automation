// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  retries: 0,

  reporter: 'html',

use: {
  baseURL: 'https://www.saucedemo.com',

  // Run headed locally, headless in GitHub Actions
  headless: !!process.env.CI,

  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',

  launchOptions: {
    slowMo: process.env.CI ? 0 : 700
  }
},
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});