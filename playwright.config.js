const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  reporter: [["html", { open: "never" }], ["list"]],

  timeout: 60000,

  workers: process.env.CI ? 1 : 1,

  retries: process.env.CI ? 1 : 0,

  expect: {
    timeout: 20000,
  },

  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      testIgnore: ["**/mobile_*.spec.js"],
    },

    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
      testMatch: ["**/mobile_*.spec.js"],
    },
  ],
});