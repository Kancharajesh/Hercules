import { test, expect } from "@playwright/test";
import { Login_model } from "../pages/Login_model.js";

test("TC01 - Login with valid credentials and verify redirect URL", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.login("rajesh@jupitermeta.io", "12345678");

  await expect(page).toHaveURL("https://hercules.works/ai");
});

test("TC02 - Verify login form opens", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();

  await expect(login.emailfield).toBeVisible();
  await expect(login.passwordfield).toBeVisible();
  await expect(login.signInbutton).toBeVisible();
});

test.skip("TC03 - Click login with empty fields and verify required messages", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.clickLoginOnly();

  await expect(login.email_message).toBeVisible();
  await expect(login.password_message).toBeVisible();
});

test.skip("TC04 - Enter only email and verify password required message", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();

  await login.emailfield.fill("rajesh@jupitermeta.io");
  await login.clickLoginOnly();

  await expect(login.password_message).toBeVisible();
});

test.skip("TC05 - Enter only password and verify email required message", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();

  await login.passwordfield.fill("12345678");
  await login.clickLoginOnly();

  await expect(login.email_message).toBeVisible();
});

test("TC06 - Login with invalid password (should stay on same page)", async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.login("rajesh@jupitermeta.io", "876543210");

  // URL should NOT become the logged-in page if login fails
  await expect(page).not.toHaveURL("https://hercules.works/ai");
});
