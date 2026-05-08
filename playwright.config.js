const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  // Local = HTML report, Git/CI = terminal only
  reporter: process.env.CI ? "line" : "html",

  timeout: 60000,
  workers: 2,
  retries: process.env.CI ? 1 : 0,

  expect: {
    timeout: 20000,
  },

  use: {
    headless: true,

    trace: "off",
    screenshot: "off",
    video: "off",

    actionTimeout: 30000,
    navigationTimeout: 60000,
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