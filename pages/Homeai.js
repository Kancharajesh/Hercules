import { expect } from "@playwright/test";

export class Homeai {
  constructor(page) {
    this.page = page;

    this.homepage = page.locator(
      "xpath=(//div[contains(@class,'md:min-h-screen') and contains(@class,'bg-white')])[1]"
    );

    this.home_topbar = page.locator(
      "xpath=(//div[contains(@class,'justify-between') and contains(@class,'items-center')])[1]"
    );

    this.profile_icon = page.locator(
      "xpath=(//div[contains(@class,'rounded-full') and contains(@class,'cursor-pointer')])[1]"
    );

    this.notification_icon = page.locator(
      "xpath=(//div[contains(@class,'hidden md:block') and contains(@class,'cursor-pointer')])[1]"
    );

    this.dashboard_cards = page.locator(
      "xpath=(//div[contains(@class,'shadow-[0px_10px_15px_0px_#00000008]')])[1]"
    );

    this.survey_templates = page.locator("xpath=(//div[contains(@class,'w-full')])[52]");

    this.survey_cards_viewAll = page.locator("xpath=(//div[contains(text(),'View All')])[1]");

    this.survey_allcards = page.locator(
      "xpath=(//div[contains(@class,'mb-[72px]') and contains(@class,'mt-8')])[1]"
    );

    // ---- Survey templates page ----
    this.SurveyTemplates_viewAll = page.locator("xpath=(//div[normalize-space()='View All'])[2]");
    this.SurveyResearch_Templates = page.locator("xpath=(//div)[50]");
    this.SurveyResearch_AllTemplates = page.locator("xpath=(//div)[96]");

    this.Reseach_Tempates_button = page.locator(
      "xpath=(//span[normalize-space()='Research Templates'])[1]"
    );

    this.Saved_tempates_button = page.locator("xpath=(//button)[8]");

    // ---- AI prompt ----
    this.ai_prompt_input_field = page.locator("#prompt");
    this.ai_prompt_submit_button = page.locator("button[aria-label='submit button']").first();

    // ❗avoid jsx-xxxx dynamic class
    this.ai_chat_suggestions = page.locator("div.markdown-content").first();

    this.ai_suggest_visible = this.page.locator("div.markdown-content").last();
  }

  // ✅ Common verify: visible + clickable-ready
  async verifyVisibleAndClickable(locator) {
    await expect(locator).toBeVisible({ timeout: 15000 });
    await locator.click({ trial: true });
  }

  // ✅ Existing verifies
  async verifyHomepage() {
    await this.verifyVisibleAndClickable(this.homepage);
  }

  async verifyTopBar() {
    await this.verifyVisibleAndClickable(this.home_topbar);
  }

  async verifyProfileIcon() {
    await this.verifyVisibleAndClickable(this.profile_icon);
  }

  async verifyNotificationIcon() {
    await this.verifyVisibleAndClickable(this.notification_icon);
  }

  async verifyDashboardCards() {
    await this.verifyVisibleAndClickable(this.dashboard_cards);
  }

  async verifySurveyTemplates() {
    await this.verifyVisibleAndClickable(this.survey_templates);
  }

  async verifySurveyViewAll() {
    await this.verifyVisibleAndClickable(this.survey_cards_viewAll);
  }

  async verifyAllSurveyCardsSection() {
    await expect(this.survey_allcards).toBeVisible({ timeout: 15000 });
  }

  // ✅ New verifies
  async verifySurveyTemplatesViewAll() {
    await this.verifyVisibleAndClickable(this.SurveyTemplates_viewAll);
  }

  async verifySurveyResearchTemplates() {
    await expect(this.SurveyResearch_Templates).toBeVisible({ timeout: 15000 });
  }

  async verifySurveyResearchAllTemplates() {
    await expect(this.SurveyResearch_AllTemplates).toBeVisible({ timeout: 15000 });
  }

  async verifyResearchTemplatesButton() {
    await this.verifyVisibleAndClickable(this.Reseach_Tempates_button);
  }

  async verifySavedTemplatesButton() {
    await this.verifyVisibleAndClickable(this.Saved_tempates_button);
  }

  // Optional click methods
  async clickProfileIcon() {
    await this.verifyProfileIcon();
    await this.profile_icon.click();
  }

  async clickNotificationIcon() {
    await this.verifyNotificationIcon();
    await this.notification_icon.click();
  }

  async verifySurveyCardsFlow() {
    await this.verifySurveyViewAll();
    await this.verifyAllSurveyCardsSection();
  }

  //  AI prompt methods
  async enterPrompt(text) {
    await expect(this.ai_prompt_input_field).toBeVisible({ timeout: 15000 });
    await this.ai_prompt_input_field.fill(text);
  }

  async submitPrompt() {
    await expect(this.ai_prompt_submit_button).toBeVisible({ timeout: 15000 });
    await this.ai_prompt_submit_button.click();
  }

  async verifyChatSuggestion() {
  await expect(
    this.ai_chat_suggestions,
    "AI response did not load within 20 seconds"
  ).toBeVisible({ timeout: 20000 });

  const text = await this.ai_chat_suggestions.textContent();

  if (!text || text.trim().length < 5) {
    throw new Error("AI response is too short or empty");
  }
}

async verifyAndPrintAiSuggestion() {
  await expect(
    this.ai_suggest_visible,
    "AI suggestion not visible"
  ).toBeVisible({ timeout: 20000 });

  const text = await this.ai_suggest_visible.textContent();

  if (!text || text.trim().length === 0) {
    throw new Error("AI suggestion is empty");
  }

  console.log("🤖 AI Response:\n", text);
}

}
