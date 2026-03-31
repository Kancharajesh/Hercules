import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { Login_model } from "../pages/Login_model.js";

test.beforeEach(async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.login("rajesh@jupitermeta.io", "12345678");

  await page.waitForLoadState("domcontentloaded");
});

test("Verify Home menu is visible and enabled", async ({ page }) => {
  const home = new HomePage(page);
  await home.home_visible();
});

test("Verify Research menu is visible and clickable", async ({ page }) => {
  const home = new HomePage(page);
  await home.research_visible();
});

test("Click Research menu and verify Research content", async ({ page }) => {
  const home = new HomePage(page);
  await home.research_click();
});

test.skip("Verify Pricing menu is visible and clickable", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_visible();
});

test("Click Pricing menu and verify Pricing popup opens", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
});

test("Verify Pricing Free plan is visible", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
  await home.pricing_free_visible();
});

test("Verify Pricing Monthly plan is visible", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
  await home.pricing_monthly_visible();
});

test("Verify Pricing Annually plan is visible", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
  await home.pricing_annually_visible();
});

test("Verify Pricing Enterprise plan is visible", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
  await home.pricing_enterprise_visible();
});

test("Close Pricing popup", async ({ page }) => {
  const home = new HomePage(page);
  await home.pricing_click();
  await home.pricing_close_click();
});

test("Verify About Us menu is visible and clickable", async ({ page }) => {
  const home = new HomePage(page);
  await home.aboutus_visible();
});

test("Click About Us menu and verify About Us content", async ({ page }) => {
  const home = new HomePage(page);
  await home.aboutus_click();
});

test("Verify Super J menu is visible and clickable", async ({ page }) => {
  const home = new HomePage(page);
  await home.superj_visible();
});

test("Click Super J and verify URL", async ({ page }) => {
  const home = new HomePage(page);

  await home.superj_click();
  await page.waitForURL("https://superj.app/Welcome", { timeout: 20000 });
  await expect(page).toHaveURL("https://superj.app/Welcome");
});