import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : 3,
  
  // Output folder for test results
  outputDir: 'test-results/',
  // Reporter configuration
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
    ['html', { open: 'never' }],
  ],

  // Global test configuration
  use: {
    // Base URL for the automation exercise website
    baseURL: 'https://www.automationexercise.com/',
    
    headless: false,

    // Global timeout for all tests
    actionTimeout: 30000,
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Trace collection
    trace: 'retain-on-failure',
  },

  // Test projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Temporarily disabled for faster development runs
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Development server configuration (if needed)
  webServer: undefined,
});
