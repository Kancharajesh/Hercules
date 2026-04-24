import { expect } from "@playwright/test";

export class Homeai {
  constructor(page) {
    this.page = page;

    // ---------- Home / Dashboard ----------
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

    // ---------- Survey Templates ----------
    this.survey_templates = page.locator(
      "xpath=(//div[contains(@class,'w-full')])[52]"
    );

    this.survey_cards_viewAll = page.locator(
      "xpath=(//div[contains(text(),'View All')])[1]"
    );

    this.survey_allcards = page.locator(
      "xpath=(//div[contains(@class,'mb-[72px]') and contains(@class,'mt-8')])[1]"
    );

    this.SurveyTemplates_viewAll = page.locator(
      "xpath=(//div[normalize-space()='View All'])[2]"
    );

    this.SurveyResearch_Templates = page.locator("xpath=(//div)[50]");
    this.SurveyResearch_AllTemplates = page.locator("xpath=(//div)[96]");

    this.Reseach_Tempates_button = page.locator(
      "xpath=(//span[normalize-space()='Research Templates'])[1]"
    );

    this.Saved_tempates_button = page.locator("xpath=(//button)[8]");

    // ---------- AI Prompt ----------
    this.ai_prompt_input_field = page.locator("#prompt");

    this.ai_prompt_submit_button = page
      .locator("button[aria-label='submit button']")
      .first();

    this.ai_chat_suggestions = page.locator("div.markdown-content").last();
    this.ai_suggest_visible = page.locator("div.markdown-content").last();

    // ---------- Campaign / Research Brief Flow ----------
    this.ai_campaign_input = page.locator("(//textarea[@id='prompt'])[1]");

    this.ai_campaign_submit_button = page
      .locator("button[aria-label='submit button']")
      .first();

    this.ai_use_all_button = page
      .getByText(/use all|use this|create survey|let'?s create/i)
      .first();

    this.ai_final_submit_button = page
      .locator("button[aria-label='submit button']")
      .last();

    this.ai_campaign_researchbrief = page.locator(
      "xpath=(//div[@id='brief-content'])[1]"
    );
  }

  // ---------- Common Validation ----------
  async verifyVisible(locator) {
    await expect(locator).toBeVisible({ timeout: 15000 });
  }

  async verifyClickable(locator) {
    await expect(locator).toBeVisible({ timeout: 15000 });
    await expect(locator).toBeEnabled();
  }

  // ---------- Home / Dashboard ----------
  async verifyHomepage() {
    await this.verifyVisible(this.homepage);
  }

  async verifyTopBar() {
    await this.verifyVisible(this.home_topbar);
  }

  async verifyProfileIcon() {
    await this.verifyClickable(this.profile_icon);
  }

  async verifyNotificationIcon() {
    await this.verifyVisible(this.notification_icon);
  }

  async verifyDashboardCards() {
    await this.verifyVisible(this.dashboard_cards);
  }

  // ---------- Survey Templates ----------
  async verifySurveyTemplates() {
    await this.verifyVisible(this.survey_templates);
  }

  async verifySurveyViewAll() {
    await this.verifyClickable(this.survey_cards_viewAll);
  }

  async verifyAllSurveyCardsSection() {
    await this.verifyVisible(this.survey_allcards);
  }

  async verifySurveyTemplatesViewAll() {
    await this.verifyClickable(this.SurveyTemplates_viewAll);
  }

  async verifySurveyResearchTemplates() {
    await this.verifyVisible(this.SurveyResearch_Templates);
  }

  async verifySurveyResearchAllTemplates() {
    await this.verifyVisible(this.SurveyResearch_AllTemplates);
  }

  async verifyResearchTemplatesButton() {
    await this.verifyClickable(this.Reseach_Tempates_button);
  }

  async verifySavedTemplatesButton() {
    await this.verifyClickable(this.Saved_tempates_button);
  }

  async clickSurveyTemplatesViewAll() {
    await this.verifySurveyTemplatesViewAll();
    await this.SurveyTemplates_viewAll.click();
  }

  async clickResearchTemplatesButton() {
    await this.verifyResearchTemplatesButton();
    await this.Reseach_Tempates_button.click();
  }

  async clickSavedTemplatesButton() {
    await this.verifySavedTemplatesButton();
    await this.Saved_tempates_button.click();
  }

  // ---------- AI Prompt ----------
  async enterPrompt(text) {
    await this.verifyVisible(this.ai_prompt_input_field);
    await this.ai_prompt_input_field.fill(text);
  }

  async submitPrompt() {
    await this.verifyClickable(this.ai_prompt_submit_button);
    await this.ai_prompt_submit_button.click();
  }

  async verifyChatSuggestion() {
    await expect(
      this.ai_chat_suggestions,
      "AI response did not load within 20 seconds"
    ).toBeVisible({ timeout: 20000 });

    const text = await this.ai_chat_suggestions.textContent();

    if (!text || text.trim().length < 10) {
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

    console.log("========== AI RESPONSE ==========");
    console.log(text);
    console.log("=================================");
  }

  // ---------- Campaign / Research Brief ----------
  async enterCampaignPrompt(text) {
    await this.verifyVisible(this.ai_campaign_input);
    await this.ai_campaign_input.fill(text);
  }

  async submitCampaignPrompt() {
    await this.verifyClickable(this.ai_campaign_submit_button);
    await this.ai_campaign_submit_button.click();
  }

  async selectAiResponseAndProceed() {
  const button = this.page
    .getByText(/use all|use this|create survey|let'?s create/i)
    .first();

  await button.waitFor({ state: "attached", timeout: 30000 });
  await button.click({ force: true });
}

async submitFinalSurvey() {
  await this.ai_final_submit_button.waitFor({ state: "attached", timeout: 15000 });
  await this.ai_final_submit_button.click({ force: true });
}

async verifyCampaignResearchBrief() {
  await this.ai_campaign_researchbrief.waitFor({
    state: "attached",
    timeout: 30000,
  });

  const text = await this.ai_campaign_researchbrief.textContent();

  if (!text || text.trim().length < 10) {
    throw new Error("Research brief is empty or too short");
  }

  console.log("========== RESEARCH BRIEF ==========");
  console.log(text);
  console.log("====================================");
}
}