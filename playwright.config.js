const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  reporter: "html",
  timeout: 30000,
  workers: 2, // 👈 runs tests sequentially

  expect: {
    timeout: 15000,
  },

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false
  },
  

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      testIgnore: [
        "**/mobile_*.spec.js",
      ],
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
      testMatch: [
        "**/mobile_*.spec.js",
      ],
    },
  ],
});