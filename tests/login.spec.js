import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { Login_model } from "../pages/Login_model.js";
import { Signup_model } from "../pages/Signup_model.js";

const HERCULES_AI_URL = process.env.TARGET_URL || "https://hercules.works/ai";
const STEP_DELAY_MS = Number(process.env.STEP_DELAY_MS || 700);
const LOGIN_URL = /^https:\/\/hercules\.works\/login\?next=(?:\/ai|%2Fai)$/i;
const SIGNUP_URL = /^https:\/\/hercules\.works\/signup\?next=(?:\/ai|%2Fai)$/i;
const VALID_EMAIL = "rajesh@jupitermeta.io";
const VALID_PASSWORD = "12345678";
const INVALID_PASSWORD = "876543210";

async function pause(page) {
  if (STEP_DELAY_MS > 0) {
    await page.waitForTimeout(STEP_DELAY_MS);
  }
}

async function openLandingPage(page) {
  await page.goto(HERCULES_AI_URL, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(HERCULES_AI_URL);
  await pause(page);
}

async function openLoginPage(page) {
  const login = new Login_model(page);

  await clickSlow(page, login.loginBtn.first(), "Log In button");
  await expect(page).toHaveURL(LOGIN_URL);
  return login;
}

async function openSignupPage(page) {
  const signup = new Signup_model(page);

  await clickSlow(page, signup.signupButton.first(), "Sign Up button");
  await expect(page).toHaveURL(SIGNUP_URL);
  return signup;
}

test.beforeEach(async ({ page }) => {
  await openLandingPage(page);
});

async function expectVisibleAndClickable(locator, label) {
  await expect(locator, `${label} should be visible`).toBeVisible({
    timeout: 15000,
  });
  await expect(locator, `${label} should be clickable`).toBeEnabled();
}

async function expectVisibleAndEnabled(locator, label) {
  await expect(locator, `${label} should be visible`).toBeVisible({
    timeout: 15000,
  });
  await expect(locator, `${label} should be enabled`).toBeEnabled();
}

async function clickSlow(page, locator, label) {
  await expectVisibleAndClickable(locator, label);
  await locator.click();
  await pause(page);
}

async function fillSlow(page, locator, label, value) {
  await expectVisibleAndEnabled(locator, label);
  await locator.fill(value);
  await pause(page);
}

test.afterEach(async ({ page }) => {
  await pause(page);
});

test("TC02 - Header navigation links work", async ({ page }) => {
  const home = new HomePage(page);
  const navLinks = [
    {
      name: "Home",
      locator: home.home.first(),
      expectedUrl: HERCULES_AI_URL,
    },
    {
      name: "Research",
      locator: home.research.first(),
      expectedUrl: /^https:\/\/hercules\.works\/research\/?$/i,
    },
    {
      name: "Pricing",
      locator: home.pricing.first(),
      expectedUrl: /^https:\/\/hercules\.works\/pricing\/?$/i,
    },
    {
      name: "About Us",
      locator: home.aboutUs.first(),
      expectedUrl: /^https:\/\/hercules\.works\/about\/?$/i,
    },
    {
      name: "Super J",
      locator: home.superJ.first(),
      expectedUrl: /^https:\/\/superj\.app\/welcome\/?$/i,
    },
  ];

  for (const link of navLinks) {
    await openLandingPage(page);
    await clickSlow(page, link.locator, `${link.name} menu`);
    await expect(page).toHaveURL(link.expectedUrl, { timeout: 30000 });
  }
});

test("TC07 - Try it for free button is visible and clickable", async ({ page }) => {
  const tryItForFreeButton = page
    .getByRole("button", { name: /Try it for free/i })
    .first();

  await clickSlow(page, tryItForFreeButton, "Try it for free button");
  await expect(page).toHaveURL(HERCULES_AI_URL);
  await expect(page.getByText("Create a", { exact: true }).first()).toBeVisible();
});

test("TC08 - Get suggestions button is visible and clickable", async ({ page }) => {
  const getSuggestionsButton = page
    .getByRole("button", { name: /^Get suggestions$/i })
    .first();

  await clickSlow(page, getSuggestionsButton, "Get suggestions button");
  await expect(page).toHaveURL(HERCULES_AI_URL);
  await expect(page.getByText(/Create a/i).first()).toBeVisible();
});

test("TC09 - Login and signup flows work together", async ({ page }) => {
  const login = new Login_model(page);

  await clickSlow(page, login.loginBtn.first(), "Log In button");
  await expect(login.heading).toBeVisible();
  await expectVisibleAndClickable(login.googleButton, "Continue with Google button");

  await fillSlow(page, login.emailfield, "Login email field", VALID_EMAIL);
  await fillSlow(page, login.passwordfield, "Login password field", VALID_PASSWORD);
  await clickSlow(page, login.signInbutton, "Log In submit button");
  await expect(page).toHaveURL(HERCULES_AI_URL, { timeout: 30000 });

  const signUpContext = await page.context().browser().newContext();
  const signUpPage = await signUpContext.newPage();
  const signup = new Signup_model(signUpPage);

  await openLandingPage(signUpPage);
  await clickSlow(signUpPage, signup.signupButton.first(), "Sign Up button");
  await expect(signUpPage).toHaveURL(SIGNUP_URL, { timeout: 15000 });

  await expect(signup.heading).toBeVisible();
  await expect(signup.subheading).toBeVisible();
  await expectVisibleAndClickable(signup.googleButton, "Continue with Google button");

  const email = `qa.signup.${Date.now()}@example.com`;
  const password = "QaTest12345!";

  await fillSlow(signUpPage, signup.emailfield, "Signup email field", email);
  await fillSlow(signUpPage, signup.passwordfield, "Signup password field", password);
  await fillSlow(signUpPage, signup.confirmPasswordfield, "Signup confirm password field", password);
  await expectVisibleAndClickable(signup.termsCheckbox, "Terms checkbox");
  await signup.termsCheckbox.check();
  await pause(signUpPage);
  await expect(signup.signupButton).toBeEnabled();

  await signUpContext.close();
});
