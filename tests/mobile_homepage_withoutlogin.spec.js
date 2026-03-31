import { test, expect } from "@playwright/test";
import { Mobile_Homepage_withoutlogin } from "../pages/Mobile_Homepage_withoutlogin.js";

test("Mobile - Verify homepage is visible", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.verifyMobileHomePage();
});

test("Mobile - Verify login button is visible", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.verifyLoginButton();
});

test("Mobile - Verify signup button is visible", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.verifySignupButton();
});

test("Mobile - Click login and verify login page", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.clickLogin();
});

test("Mobile - Click signup and verify signup page", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.clickSignup();
});

test("Mobile - Verify Try it for free button", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.clickTryItForFree();
});

test("Mobile - Verify prompt input field", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();
  await mobile.enterPrompt("Create a survey for customer satisfaction");
});

test("Mobile - Verify prompt submission", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();

  const prompt = `Create a survey ${Date.now()}`;

  await mobile.enterPrompt(prompt);
  await mobile.clickSend();
});

test("Mobile - Login and verify top bar", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();

  await mobile.clickLogin();

  await mobile.mobileLogin(
    "rajesh@jupitermeta.io",
    "12345678"
  );

  await mobile.verifyAfterLoginTopBar();
});

test("Mobile - Verify write prompt button visible", async ({ page }) => {
  const mobile = new Mobile_Homepage_withoutlogin(page);

  await mobile.launchTheBrowser();

  await expect(mobile.mobile_chat_write_prompt_button).toBeVisible();
});