import { defineConfig, devices } from "@playwright/test";
import "allure-playwright"; // ⭐ REQUIRED for Jenkins to generate allure-results

export default defineConfig({
  timeout: 30 * 1000,
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 5,

  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results" }], // ⭐ Correct folder
    ["html"],
  ],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"],
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
