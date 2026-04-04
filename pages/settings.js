import { test, expect } from "@playwright/test";
import { Login_model } from "../pages/Login_model.js";
import { Settings } from "../pages/settings.js";

test.beforeEach(async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.login("rajesh@jupitermeta.io", "12345678");

  await page.waitForLoadState("domcontentloaded");
});

test("Verify profile menu opens", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.verifyProfilePopup();
});

test("Verify profile credits are visible", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.verifyProfileCredits();
});

test("Verify Get Free Credits popup opens", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.openFreeCredits();
});

test("Verify Get Free Credits popup closes", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.openFreeCredits();
  await settings.closeFreeCreditsPopup();
});

test("Verify General settings page", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openGeneralSettings();
  await settings.verifyGeneralSettings();
});
  
//rajesh
test("Verify Account settings page", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openAccountSettings();
  await settings.verifyAccountSettings();
});

test("Verify Billing settings page", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openBillingSettings();
  await settings.verifyBillingSettings();
});

test("Verify Help page", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openHelp();
  await settings.verifyHelpPage();
});

test("Verify Dashboard page", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openDashboard();
  await settings.verifyDashboardPage();
});

test("Verify Logout popup opens", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.clickLogout();
  await settings.verifyLogoutPopup();
});

test("Verify Logout popup cancel button", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.clickLogout();
  await settings.cancelLogout();
  await expect(settings.logout_popup).toBeHidden();
});