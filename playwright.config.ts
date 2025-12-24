import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: './src/hooks/api-global-setup.ts',
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['allure-playwright'],
        ['list'],
        ['json', { outputFile: 'playwright-reports/json-playwright-report.json' }],
        ['html', { outputFolder: 'playwright-reports/html-playwright-report' }],
        ['junit', { outputFile: 'playwright-reports/xmls-playwright-report.xml' }]
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 1000 // затримка 1000мс між діями
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'incomes-api',
            testMatch: '**/incomes.api.spec.ts',
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'expenses-api',
            testMatch: '**/expenses.api.spec.ts',
            // dependencies: ['incomes-api'],
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'taxes-api',
            testMatch: '**/taxes.api.spec.ts',
            // dependencies: ['incomes-api', 'expenses-api'],
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'reports-api',
            testMatch: '**/reports.api.spec.ts',
            // dependencies: ['incomes-api', 'expenses-api'],
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'login-api',
            testMatch: '**/login.api.spec.ts',
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'authenticate-api',
            testMatch: '**/authenticate.api.spec.ts',
            // dependencies: ['incomes-api', 'expenses-api', 'taxes-api', 'reports-api', 'login-api'],
            use: { ...devices['Desktop Chrome'], headless: true }
        },
        {
            name: 'ui-tests',
            testMatch: '**/ui/*.{spec,e2e.spec}.ts',
            // dependencies: ['expenses-api', 'taxes-api'],
            use: { ...devices['Desktop Chrome'], headless: false }
        }

        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] }
        // }

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
