import { expect } from "@playwright/test";

const DEFAULT_AI_URL = "https://hercules.works/ai";
const DEFAULT_EMAIL = "rajesh@jupitermeta.io";
const DEFAULT_PASSWORD = "12345678";

export class AuthenticatedFlows_model {
  constructor(page) {
    this.page = page;
    this.aiUrl = process.env.TARGET_URL || DEFAULT_AI_URL;
    this.email = process.env.AUTH_EMAIL || DEFAULT_EMAIL;
    this.password = process.env.AUTH_PASSWORD || DEFAULT_PASSWORD;

    // Login
    this.loginButton = page
      .getByRole("button", { name: /^log in$/i })
      .filter({ visible: true })
      .first();
    this.emailInput = page.getByPlaceholder(/Enter your email/i);
    this.passwordInput = page.getByPlaceholder(/Enter your password/i);
    this.loginSubmitButton = page
      .getByRole("button", { name: /^log in$/i })
      .filter({ visible: true })
      .first();

    // Authenticated home
    this.profileIcon = page.locator("img[alt='nav-profile']").first();
    this.promptInput = page.locator("#prompt").first();
    this.uploadButton = page
      .getByRole("button", { name: /upload button/i })
      .first();
    this.submitPromptButton = page
      .locator("button[aria-label='submit button']")
      .first();
    this.firstSuggestedPrompt = page
      .getByText("A/B Test Video Ads with any User Group", { exact: true })
      .first();
    this.secondSuggestedPrompt = page
      .getByText("Quick insights on which product packaging is better", {
        exact: true,
      })
      .first();
    this.homeBody = page.locator("body");

    // Dashboard survey cards
    this.dashboardTitle = page.getByText(/Hercules Dashboard/i).first();
    this.dashboardSearchInput = page
      .getByRole("textbox", { name: /Search/i })
      .first();
    this.dashboardFilterDropdown = page
      .getByRole("button", { name: /All dropdown arrow/i })
      .first();
    this.dashboardSortDropdown = page
      .getByRole("button", { name: /Newest First dropdown arrow/i })
      .first();
    this.dashboardViewAll = page
      .locator(
        "xpath=//*[contains(normalize-space(),'Hercules Dashboard')]/following::*[normalize-space()='View All'][1]"
      )
      .first();
    this.draftStatus = page.getByText("Drafts", { exact: true }).first();
    this.pausedStatus = page.getByText("Paused", { exact: true }).first();
    this.completedStatus = page.getByText("Completed", { exact: true }).first();
    this.firstSurveyCardMenu = page
      .getByRole("button", { name: /Open menu/i })
      .first();
    this.surveyCardDuplicateOption = this.firstSurveyCardMenu
      .getByText("Duplicate", { exact: true })
      .first();
    this.surveyCardRenameOption = this.firstSurveyCardMenu
      .getByText("Rename", { exact: true })
      .first();
    this.surveyCardSettingsOption = this.firstSurveyCardMenu
      .getByText("Settings", { exact: true })
      .first();
    this.surveyCardDeleteOption = this.firstSurveyCardMenu
      .getByText("Delete", { exact: true })
      .first();

    // Survey Resources
    this.surveyResourcesHeading = page
      .getByText("Survey Resources", { exact: true })
      .first();
    this.surveyResourcesViewAll = page
      .locator(
        "xpath=//*[normalize-space()='Survey Resources']/following::*[normalize-space()='View All'][1]"
      )
      .first();
    this.researchTemplatesCard = page
      .getByRole("button", { name: /Research Templates/i })
      .first();
    this.savedAudiencesCard = page
      .getByRole("button", { name: /Saved Audiences/i })
      .first();
    this.allTemplatesFilter = page
      .getByRole("button", { name: /^all$/i })
      .first();
    this.communityImpactFilter = page
      .getByRole("button", { name: /community & social impact/i })
      .first();
    this.newIdeaTestingFilter = page
      .getByRole("button", { name: /new idea testing/i })
      .first();
    this.firstTemplateCard = page
      .getByText("Evil Huntar AR Game Concept Testing", { exact: true })
      .first();
    this.communityTemplateCard = page
      .getByText("Women's Decision-Making in Indian Families", { exact: true })
      .first();
    this.newIdeaTemplateCard = page
      .getByText("The Side Hustle Motivations & Landscape", { exact: true })
      .first();

    // Profile menu
    this.profilePopup = page
      .getByRole("dialog")
      .filter({ hasText: /Turn Pro|Get free credits|Credits/i })
      .first();
    this.profileCredits = this.profilePopup
      .getByRole("heading", { name: /^Credits$/i })
      .first();
    this.getFreeCredits = this.profilePopup
      .getByRole("heading", { name: /Get free credits/i })
      .first();
    this.settingsMenuItem = this.profilePopup
      .getByRole("heading", { name: /^Settings$/i })
      .first();
    this.helpMenuItem = this.profilePopup
      .getByRole("heading", { name: /^Help$/i })
      .first();
    this.dashboardMenuItem = this.profilePopup
      .getByRole("heading", { name: /^Dashboard$/i })
      .first();
    this.logoutMenuItem = this.profilePopup
      .getByRole("heading", { name: /^Logout$/i })
      .first();

    // Dialogs
    this.dialog = page.getByRole("dialog").first();
    this.closeCreditsDialogButton = page.locator("img[alt='close-modal']").first();
    this.logoutCancelButton = page.getByRole("button", { name: "Cancel" });
    this.logoutConfirmButton = page
      .getByRole("button", { name: "Logout" })
      .filter({ visible: true })
      .last();

    // Settings
    this.generalTab = page.getByRole("button", { name: /^General$/i }).first();
    this.accountTab = page.getByRole("button", { name: /^Account$/i }).first();
    this.billingTab = page.getByRole("button", { name: /^Billing$/i }).first();

    // Help
    this.helpHeading = page
      .getByRole("heading", { name: /Hercules Help|Help/i })
      .filter({ visible: true })
      .first();
  }

  async login() {
    await this.page.goto(this.aiUrl, { waitUntil: "domcontentloaded" });
    await expect(this.loginButton).toBeVisible({ timeout: 15000 });
    await this.loginButton.click();

    await expect(this.emailInput).toBeVisible({ timeout: 15000 });
    await this.emailInput.fill(this.email);
    await this.passwordInput.fill(this.password);
    await expect(this.loginSubmitButton).toBeEnabled();
    await this.loginSubmitButton.click();

    await expect(this.profileIcon).toBeVisible({ timeout: 30000 });
    await expect(this.promptInput).toBeVisible({ timeout: 30000 });
  }

  async verifyAuthenticatedHome() {
    await expect(this.page).toHaveURL(/\/ai\/?$/i);
    await expect(this.profileIcon).toBeVisible();
    await expect(this.promptInput).toBeVisible();
    await expect(this.loginButton).toBeHidden();
  }

  async verifyPromptControlsAndInput() {
    const prompt = `Create a customer onboarding survey ${Date.now()}`;

    await expect(this.promptInput).toBeVisible();
    await expect(this.promptInput).toBeEnabled();
    await this.promptInput.fill(prompt);
    await expect(this.promptInput).toHaveValue(prompt);
    await expect(this.uploadButton).toBeVisible();
    await expect(this.submitPromptButton).toBeVisible();
    await expect(this.firstSuggestedPrompt).toBeVisible();
    await expect(this.secondSuggestedPrompt).toBeVisible();
  }

  async verifyDashboardSurveyCards() {
    await expect(this.dashboardTitle).toBeVisible({ timeout: 15000 });
    await expect(this.dashboardSearchInput).toBeVisible();
    await expect(this.dashboardSearchInput).toBeEnabled();
    await expect(this.dashboardFilterDropdown).toBeVisible();
    await expect(this.dashboardSortDropdown).toBeVisible();
    await expect(this.dashboardViewAll).toBeVisible();
    await expect(this.draftStatus).toBeVisible();
    await expect(this.pausedStatus).toBeVisible();
    await expect(this.completedStatus).toBeVisible();
    await expect(this.firstSurveyCardMenu).toBeVisible();
  }

  async verifyDashboardSearchFunctionality() {
    const searchTerm = "India Insurance";

    await expect(this.dashboardSearchInput).toBeVisible({ timeout: 15000 });
    await this.dashboardSearchInput.fill(searchTerm);
    await expect(this.dashboardSearchInput).toHaveValue(searchTerm);
    await expect(
      this.page.getByText(/India Insurance Digital Adoption & Trust Study/i).first()
    ).toBeVisible({ timeout: 15000 });

    await this.dashboardSearchInput.fill("");
    await expect(this.dashboardSearchInput).toHaveValue("");
    await expect(this.draftStatus.or(this.completedStatus).first()).toBeVisible({
      timeout: 15000,
    });
  }

  async verifyDashboardCardMenuOpens() {
    await expect(this.firstSurveyCardMenu).toBeVisible({ timeout: 15000 });
    await this.firstSurveyCardMenu.click();
    await expect(this.surveyCardDuplicateOption).toBeVisible({ timeout: 15000 });
    await expect(this.surveyCardRenameOption).toBeVisible();
    await expect(this.surveyCardSettingsOption).toBeVisible();
    await expect(this.surveyCardDeleteOption).toBeVisible();
  }

  async verifySurveyResourcesSection() {
    await expect(this.surveyResourcesHeading).toBeVisible({ timeout: 15000 });
    await expect(this.surveyResourcesViewAll).toBeVisible();
    await expect(this.researchTemplatesCard).toBeVisible();
    await expect(this.savedAudiencesCard).toBeVisible();
    await expect(this.allTemplatesFilter).toBeVisible();
    await expect(this.communityImpactFilter).toBeVisible();
    await expect(this.newIdeaTestingFilter).toBeVisible();
    await expect(this.firstTemplateCard).toBeVisible();
  }

  async verifyResearchTemplatesFunctionality() {
    await expect(this.researchTemplatesCard).toBeVisible({ timeout: 15000 });
    await this.researchTemplatesCard.click();
    await expect(this.allTemplatesFilter).toBeVisible();
    await expect(this.firstTemplateCard).toBeVisible();

    await this.communityImpactFilter.click();
    await expect(this.communityTemplateCard).toBeVisible({ timeout: 15000 });

    await this.newIdeaTestingFilter.click();
    await expect(this.newIdeaTemplateCard).toBeVisible({ timeout: 15000 });

    await this.allTemplatesFilter.click();
    await expect(this.firstTemplateCard).toBeVisible({ timeout: 15000 });
  }

  async verifySavedAudiencesFunctionality() {
    await expect(this.savedAudiencesCard).toBeVisible({ timeout: 15000 });
    await this.savedAudiencesCard.click();
    await expect(
      this.page
        .getByText(/Saved Audiences|Saved Audience|No saved audiences|Audience/i)
        .first()
    ).toBeVisible({ timeout: 15000 });
  }

  async verifySurveyResourcesViewAllFunctionality() {
    await expect(this.surveyResourcesViewAll).toBeVisible({ timeout: 15000 });
    await this.surveyResourcesViewAll.click();
    await expect(this.researchTemplatesCard).toBeVisible({ timeout: 15000 });
    await expect(this.savedAudiencesCard).toBeVisible({ timeout: 15000 });
  }

  async openProfileMenu() {
    await expect(this.profileIcon).toBeVisible({ timeout: 15000 });
    await this.profileIcon.click();
    await expect(this.profilePopup).toBeVisible({ timeout: 15000 });
  }

  async verifyProfileMenuItems() {
    await expect(this.profileCredits).toBeVisible();
    await expect(this.getFreeCredits).toBeVisible();
    await expect(this.settingsMenuItem).toBeVisible();
    await expect(this.helpMenuItem).toBeVisible();
    await expect(this.dashboardMenuItem).toBeVisible();
    await expect(this.logoutMenuItem).toBeVisible();
  }

  async verifyFreeCreditsDialogOpensAndCloses() {
    await this.getFreeCredits.click();
    await expect(this.dialog).toBeVisible({ timeout: 15000 });
    await expect(this.closeCreditsDialogButton).toBeVisible();
    await this.closeCreditsDialogButton.click();
    await expect(this.dialog).toBeHidden({ timeout: 15000 });
  }

  async openSettingsFromProfile() {
    await this.settingsMenuItem.click();
    await expect(this.page).toHaveURL(/\/settings/i, { timeout: 15000 });
    await expect(this.generalTab).toBeVisible({ timeout: 15000 });
    await expect(this.accountTab).toBeVisible();
    await expect(this.billingTab).toBeVisible();
  }

  async verifySettingsTabs() {
    await this.accountTab.click();
    await expect(this.page).toHaveURL(/page=account/i, { timeout: 15000 });
    await expect(this.accountTab).toBeVisible();

    await this.billingTab.click();
    await expect(this.page).toHaveURL(/page=billing/i, { timeout: 15000 });
    await expect(this.billingTab).toBeVisible();

    await this.generalTab.click();
    await expect(this.page).toHaveURL(/page=general/i, { timeout: 15000 });
    await expect(this.generalTab).toBeVisible();
  }

  async openHelpFromProfile() {
    await this.helpMenuItem.click();
    await expect(this.page).toHaveURL(/\/help\/?$/i, { timeout: 15000 });
    await expect(this.helpHeading).toBeVisible({ timeout: 15000 });
  }

  async verifyHelpContent() {
    await expect(this.page.getByText(/Getting Started/i).first()).toBeVisible();
    await expect(this.page.getByText(/About Hercules/i).first()).toBeVisible();
    await expect(this.page.getByText(/About Super J|About Superj/i).first()).toBeVisible();
    await expect(this.page.getByText(/Credits & Pricing/i).first()).toBeVisible();
    await expect(this.page.getByText(/Account Management/i).first()).toBeVisible();
    await expect(this.page.getByText(/Frequently Asked Questions/i).first()).toBeVisible();
  }

  async openDashboardFromProfile() {
    await this.dashboardMenuItem.click();
    await expect(this.page).toHaveURL(/\/dashboard\/?$/i, { timeout: 15000 });
    await expect(this.homeBody).toBeVisible();
  }

  async verifyLogoutCancelKeepsUserLoggedIn() {
    await this.logoutMenuItem.click();
    await expect(this.dialog).toBeVisible({ timeout: 15000 });
    await expect(this.logoutCancelButton).toBeVisible();
    await expect(this.logoutConfirmButton).toBeVisible();
    await this.logoutCancelButton.click();
    await expect(this.dialog).toBeHidden({ timeout: 15000 });
    await expect(this.profileIcon).toBeVisible();
  }

  async verifyLogoutConfirmEndsSession() {
    await this.logoutMenuItem.click();
    await expect(this.dialog).toBeVisible({ timeout: 15000 });
    await this.logoutConfirmButton.click();
    await expect(this.loginButton).toBeVisible({ timeout: 30000 });
  }
}
