// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  retries: 0,

  reporter: 'html',

  use: {

    // Base URL
    baseURL: 'https://www.saucedemo.com',

    // Show browser
    headless: false,

    // Screenshot after every test
    screenshot: 'on',

    // Record video for every test
    video: 'on',

    // Record trace for every test
    trace: 'on',

    // Slow down execution so you can watch it
    launchOptions: {
      slowMo: 700
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