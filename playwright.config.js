const { defineConfig, devices } = require("@playwright/test");

const slowMo = Number(process.env.SLOW_MO || 0);

module.exports = defineConfig({
  testDir: "./tests",

  reporter: process.env.CI
    ? [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
        ["junit", { outputFile: "test-results/results.xml" }],
        ["json", { outputFile: "test-results/results.json" }],
      ]
    : [["html", { outputFolder: "playwright-report", open: "never" }]],

  timeout: process.env.CI ? 90000 : 60000,
  workers: process.env.CI ? 2 : 2,
  retries: process.env.CI ? 1 : 0,

  expect: {
    timeout: process.env.CI ? 30000 : 20000,
  },
  
  use: {
    headless: true,
    trace: process.env.CI ? "retain-on-failure" : "off",
    screenshot: "only-on-failure",
    video: process.env.CI ? "retain-on-failure" : "off",
    actionTimeout: process.env.CI ? 45000 : 30000,
    navigationTimeout: process.env.CI ? 90000 : 60000,
    launchOptions: slowMo > 0 ? { slowMo } : undefined,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: ["**/mobile_*.spec.js"],
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: ["**/mobile_*.spec.js"],
    },
  ],
});
