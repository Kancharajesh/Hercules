import { test, expect } from "@playwright/test";
import { Login_model } from "../pages/Login_model.js";
import { Homeai } from "../pages/Homeai.js";

const topics = [
  "Create a detailed survey for customer experience improvement",
  "Make a short survey for AI product feedback",
  "Create a professional survey for employee satisfaction",
  "Make a user-friendly survey for e-commerce checkout experience",
  "Create a feedback survey for mobile app usability",
  "Make a survey to evaluate restaurant dining experience",
  "Create a post-event survey for attendee feedback",
  "Make a survey for SaaS onboarding experience",
  "Create a survey to measure website performance",
  "Make a survey for customer support quality",
  "Create a UX survey for interface improvements",
  "Make a marketing feedback survey for campaigns"
];

// 🔹 Helper to generate dynamic prompt
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

test("Verify Homepage container is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyHomepage();
});

test("Verify Top bar is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyTopBar();
});

test("Verify Profile icon is visible", async ({ page }) => {
  const homeai = new Homeai(page);
  await homeai.verifyProfileIcon();
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

// ✅ TC01
test("TC01 - Click Survey Templates View All", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.verifySurveyTemplatesViewAll();
  await homeai.SurveyTemplates_viewAll.click();

  await homeai.verifyResearchTemplatesButton();
  await homeai.verifySavedTemplatesButton();
});

// ✅ TC02
test("TC02 - View All → Research → Saved", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.verifySurveyTemplatesViewAll();
  await homeai.SurveyTemplates_viewAll.click();

  await homeai.verifyResearchTemplatesButton();

  await homeai.verifySavedTemplatesButton();
  await homeai.Saved_tempates_button.click();

  await expect(homeai.Saved_tempates_button).toBeVisible();
});

// ✅ TC03
test("TC03 - View All → Research Templates list", async ({ page }) => {
  const homeai = new Homeai(page);

  await homeai.verifySurveyTemplatesViewAll();
  await homeai.SurveyTemplates_viewAll.click();

  await homeai.verifyResearchTemplatesButton();
  await homeai.Reseach_Tempates_button.click();

  await expect(homeai.SurveyResearch_Templates).toBeVisible({ timeout: 15000 });
  await expect(homeai.SurveyResearch_AllTemplates).toBeVisible({ timeout: 15000 });
});

// ✅ AI Test 1
test.only("Verify AI prompt submission", async ({ page }) => {
  const homeai = new Homeai(page);

  const prompt = generatePrompt();

  await homeai.enterPrompt(prompt);
  await homeai.submitPrompt();

  await homeai.verifyChatSuggestion();
});

// ✅ AI Test 2 (Print response)
test.only("Verify AI prompt and print response", async ({ page }) => {
  const homeai = new Homeai(page);

  const prompt = generatePrompt();

  await homeai.enterPrompt(prompt);
  await homeai.submitPrompt();

  await homeai.verifyAndPrintAiSuggestion();
});