import { test, expect } from "@playwright/test";
import { Login_model } from "../pages/Login_model.js";
import { Homeai } from "../pages/Homeai.js";
import { Settings } from "../pages/settings.js";

const topics = [
  "customer experience improvement",
  "AI product feedback",
  "employee satisfaction",
  "e-commerce checkout experience",
  "mobile app usability",
  "restaurant dining experience",
  "event feedback",
  "SaaS onboarding",
  "website performance",
  "customer support quality",
  "UI/UX improvements",
  "marketing campaign feedback",
];

function generatePrompt() {
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  return `Create a survey for ${randomTopic} - ${Date.now()}`;
}

test.beforeEach(async ({ page }) => {
  const login = new Login_model(page);

  await login.launchTheBrowser();
  await login.openLoginForm();
  await login.login("rajesh@jupitermeta.io", "12345678");

  await page.waitForLoadState("domcontentloaded");
});

// ---------------- BASIC UI TESTS ----------------

test("Verify Homepage container is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyHomepage();
});

test("Verify Top bar is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyTopBar();
});

test("Verify Profile menu opens", async ({ page }) => {
  const settings = new Settings(page);

  await settings.openProfileMenu();
  await settings.verifyProfilePopup();
});

test("Verify Notification icon is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyNotificationIcon();
});

test("Verify Dashboard cards are visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyDashboardCards();
});

test("Verify Survey templates section", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifySurveyTemplates();
  await homeai.verifySurveyViewAll();
});

// ---------------- SURVEY FLOW ----------------

test("TC01 - Click Survey Templates View All", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.clickSurveyTemplatesViewAll();

  await homeai.verifyResearchTemplatesButton();
  await homeai.verifySavedTemplatesButton();
});

test("TC02 - View All Research Saved", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.clickSurveyTemplatesViewAll();
  await homeai.verifyResearchTemplatesButton();

  await homeai.clickSavedTemplatesButton();

  await expect(homeai.Saved_tempates_button).toBeVisible();
});

test("TC03 - View All Research Templates list", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.clickSurveyTemplatesViewAll();
  await homeai.clickResearchTemplatesButton();

  await homeai.verifySurveyResearchTemplates();
  await homeai.verifySurveyResearchAllTemplates();
});

// ---------------- AI TESTS ----------------

test("Verify AI prompt submission", async ({ page }) => {
  const homeai = new Homeai(page);

  const prompt = generatePrompt();

  await homeai.enterPrompt(prompt);
  await homeai.submitPrompt();

  await homeai.verifyChatSuggestion();
});

test("Verify AI prompt and print response", async ({ page }) => {
  const homeai = new Homeai(page);

  const prompt = generatePrompt();

  await homeai.enterPrompt(prompt);
  await homeai.submitPrompt();

  await homeai.verifyAndPrintAiSuggestion();
});

// ---------------- CAMPAIGN / RESEARCH BRIEF FULL FLOW ----------------

test.skip("Verify Research Brief generation full flow", async ({ page }) => {
  const homeai = new Homeai(page);

  const prompt = generatePrompt();

  await homeai.enterCampaignPrompt(prompt);
  await homeai.submitCampaignPrompt();

  await homeai.verifyAndPrintAiSuggestion();
  await homeai.selectAiResponseAndProceed();
  await homeai.submitFinalSurvey();

  await homeai.verifyCampaignResearchBrief();
});