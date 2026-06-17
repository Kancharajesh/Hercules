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

  await openLandingPage(page);
  await clickSlow(page, login.loginBtn.first(), "Log In button");
  await expect(page).toHaveURL(LOGIN_URL);
  return login;
}

async function openSignupPage(page) {
  const signup = new Signup_model(page);

  await openLandingPage(page);
  await clickSlow(page, signup.signupButton.first(), "Sign Up button");
  await expect(page).toHaveURL(SIGNUP_URL);
  return signup;
}

async function expectVisibleAndClickable(locator, label) {
  await expect(locator, `${label} should be visible`).toBeVisible({
    timeout: 15000,
  });
  await expect(locator, `${label} should be clickable`).toBeEnabled();
}

async function clickSlow(page, locator, label) {
  await expectVisibleAndClickable(locator, label);
  await locator.click();
  await pause(page);
}

async function fillSlow(page, locator, value) {
  await expect(locator).toBeVisible({ timeout: 15000 });
  await expect(locator).toBeEnabled();
  await locator.fill(value);
  await pause(page);
}

test.afterEach(async ({ page }) => {
  await pause(page);
});

test("TC01 - Website URL opens correctly", async ({ page }) => {
  await openLandingPage(page);
  await expect(page.getByText("Hercules AI Research Assistant").first()).toBeVisible();
  await expect(page.locator("body")).toBeVisible();
});

test("TC02 - Home menu is visible and clickable", async ({ page }) => {
  const home = new HomePage(page);

  await openLandingPage(page);
  await clickSlow(page, home.home.first(), "Home menu");
  await expect(page).toHaveURL(HERCULES_AI_URL);
});

test("TC03 - Research menu is visible, clickable, and opens Research URL", async ({
  page,
}) => {
  const home = new HomePage(page);

  await openLandingPage(page);
  await clickSlow(page, home.research.first(), "Research menu");
  await expect(page).toHaveURL(/^https:\/\/hercules\.works\/research\/?$/i, {
    timeout: 30000,
  });
});

test("TC04 - Pricing menu is visible, clickable, and opens Pricing URL", async ({
  page,
}) => {
  const home = new HomePage(page);

  await openLandingPage(page);
  await clickSlow(page, home.pricing.first(), "Pricing menu");
  await expect(page).toHaveURL(/^https:\/\/hercules\.works\/pricing\/?$/i, {
    timeout: 30000,
  });
});

test("TC05 - About Us menu is visible, clickable, and opens About URL", async ({
  page,
}) => {
  const home = new HomePage(page);

  await openLandingPage(page);
  await clickSlow(page, home.aboutUs.first(), "About Us menu");
  await expect(page).toHaveURL(/^https:\/\/hercules\.works\/about\/?$/i, {
    timeout: 30000,
  });
});

test("TC06 - Super J menu is visible, clickable, and opens Super J URL", async ({
  page,
}) => {
  const home = new HomePage(page);

  await openLandingPage(page);
  await clickSlow(page, home.superJ.first(), "Super J menu");
  await expect(page).toHaveURL(/^https:\/\/superj\.app\/welcome\/?$/i, {
    timeout: 30000,
  });
});

test("TC07 - Try it for free button is visible and clickable", async ({ page }) => {
  const tryItForFreeButton = page
    .getByRole("button", { name: /Try it for free/i })
    .first();

  await openLandingPage(page);
  await clickSlow(page, tryItForFreeButton, "Try it for free button");
  await expect(page).toHaveURL(HERCULES_AI_URL);
  await expect(page.getByText("Create a", { exact: true }).first()).toBeVisible();
});

test("TC08 - Get suggestions button is visible and clickable", async ({ page }) => {
  const getSuggestionsButton = page
    .getByRole("button", { name: /^Get suggestions$/i })
    .first();

  await openLandingPage(page);
  await clickSlow(page, getSuggestionsButton, "Get suggestions button");
  await expect(page).toHaveURL(HERCULES_AI_URL);
  await expect(page.getByText(/Create a/i).first()).toBeVisible();
});

test("TC09 - Login button opens Login URL", async ({ page }) => {
  const login = new Login_model(page);

  await openLandingPage(page);
  await clickSlow(page, login.loginBtn.first(), "Log In button");
  await expect(page).toHaveURL(LOGIN_URL);
});

test("TC10 - Login page heading and Google button are present", async ({ page }) => {
  const login = await openLoginPage(page);

  await expect(login.heading).toBeVisible();
  await expectVisibleAndClickable(login.googleButton, "Continue with Google button");
});

test("TC11 - Login email field is present and accepts value", async ({ page }) => {
  const login = await openLoginPage(page);

  await fillSlow(page, login.emailfield, VALID_EMAIL);
  await expect(login.emailfield).toHaveValue(VALID_EMAIL);
});

test("TC12 - Login password field is present and accepts value", async ({ page }) => {
  const login = await openLoginPage(page);

  await fillSlow(page, login.passwordfield, VALID_PASSWORD);
  await expect(login.passwordfield).toHaveValue(VALID_PASSWORD);
});

test("TC13 - Login button stays disabled with empty fields", async ({ page }) => {
  const login = await openLoginPage(page);

  await expect(login.signInbutton).toBeVisible();
  await expect(login.signInbutton).toBeDisabled();
});

test("TC14 - Login button becomes enabled after entering email and password", async ({
  page,
}) => {
  const login = await openLoginPage(page);

  await fillSlow(page, login.emailfield, VALID_EMAIL);
  await fillSlow(page, login.passwordfield, VALID_PASSWORD);
  await expect(login.signInbutton).toBeEnabled();
});

test("TC15 - Forgot Password option is present and clickable", async ({ page }) => {
  const login = await openLoginPage(page);

  await clickSlow(page, login.forgotPassword, "Forgot Password option");
  await expect(page).not.toHaveURL(HERCULES_AI_URL);
});

test("TC16 - Login page Sign Up link opens Signup URL", async ({ page }) => {
  const login = await openLoginPage(page);

  await clickSlow(page, login.signupSwitch, "Sign Up switch on Login page");
  await expect(page).toHaveURL(SIGNUP_URL, { timeout: 15000 });
});

test("TC17 - Login with invalid password does not reach dashboard", async ({
  page,
}) => {
  const login = await openLoginPage(page);

  await fillSlow(page, login.emailfield, VALID_EMAIL);
  await fillSlow(page, login.passwordfield, INVALID_PASSWORD);
  await clickSlow(page, login.signInbutton, "Log In submit button");
  await expect(page).not.toHaveURL(HERCULES_AI_URL);
});

test("TC18 - Login with valid credentials returns to AI URL", async ({ page }) => {
  const login = await openLoginPage(page);

  await fillSlow(page, login.emailfield, VALID_EMAIL);
  await fillSlow(page, login.passwordfield, VALID_PASSWORD);
  await clickSlow(page, login.signInbutton, "Log In submit button");
  await expect(page).toHaveURL(HERCULES_AI_URL, { timeout: 30000 });
});

test("TC19 - Signup button opens Signup URL", async ({ page }) => {
  const signup = new Signup_model(page);

  await openLandingPage(page);
  await clickSlow(page, signup.signupButton.first(), "Sign Up button");
  await expect(page).toHaveURL(SIGNUP_URL);
});

test("TC20 - Signup page heading and Google button are present", async ({ page }) => {
  const signup = await openSignupPage(page);

  await expect(signup.heading).toBeVisible();
  await expect(signup.subheading).toBeVisible();
  await expectVisibleAndClickable(signup.googleButton, "Continue with Google button");
});

test("TC21 - Signup email field is present and accepts value", async ({ page }) => {
  const signup = await openSignupPage(page);
  const email = `qa.signup.${Date.now()}@example.com`;

  await fillSlow(page, signup.emailfield, email);
  await expect(signup.emailfield).toHaveValue(email);
});

test("TC22 - Signup password field is present and accepts value", async ({
  page,
}) => {
  const signup = await openSignupPage(page);

  await fillSlow(page, signup.passwordfield, "QaTest12345!");
  await expect(signup.passwordfield).toHaveValue("QaTest12345!");
});

test("TC23 - Signup confirm password field is present and accepts value", async ({
  page,
}) => {
  const signup = await openSignupPage(page);

  await fillSlow(page, signup.confirmPasswordfield, "QaTest12345!");
  await expect(signup.confirmPasswordfield).toHaveValue("QaTest12345!");
});

test("TC24 - Signup terms checkbox is present and checkable", async ({ page }) => {
  const signup = await openSignupPage(page);

  await expectVisibleAndClickable(signup.termsCheckbox, "Terms checkbox");
  await signup.termsCheckbox.check();
  await pause(page);
  await expect(signup.termsCheckbox).toBeChecked();
});

test("TC25 - Signup Terms and Privacy options are present", async ({ page }) => {
  const signup = await openSignupPage(page);

  await expect(signup.termsLink).toBeVisible();
  await expect(signup.privacyLink).toBeVisible();
});

test("TC26 - Signup button becomes enabled after valid form data", async ({
  page,
}) => {
  const signup = await openSignupPage(page);
  const email = `qa.signup.${Date.now()}@example.com`;
  const password = "QaTest12345!";

  await fillSlow(page, signup.emailfield, email);
  await fillSlow(page, signup.passwordfield, password);
  await fillSlow(page, signup.confirmPasswordfield, password);
  await signup.termsCheckbox.check();
  await pause(page);
  await expect(signup.signupButton).toBeEnabled();
});

test("TC27 - Signup page Log In link opens Login URL", async ({ page }) => {
  const signup = await openSignupPage(page);

  await clickSlow(page, signup.loginSwitch, "Log In switch on Signup page");
  await expect(page).toHaveURL(LOGIN_URL, { timeout: 15000 });
});
