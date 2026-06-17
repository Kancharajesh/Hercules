import { expect } from "@playwright/test";

const DEFAULT_AI_URL = "https://hercules.works/ai";
const DEFAULT_EMAIL = "rajesh@jupitermeta.io";
const DEFAULT_PASSWORD = "12345678";

export class Mobile_Homepage_withoutlogin {
  constructor(page) {
    this.page = page;
    this.aiUrl = process.env.TARGET_URL || DEFAULT_AI_URL;
    this.email = process.env.AUTH_EMAIL || DEFAULT_EMAIL;
    this.password = process.env.AUTH_PASSWORD || DEFAULT_PASSWORD;

    // Public mobile home
    this.mainHeading = page
      .getByRole("heading", { name: /Hercules AI Research Assistant/i })
      .filter({ visible: true })
      .first();
    this.heroHeading = page
      .getByRole("heading", { name: /Hercules works for/i })
      .filter({ visible: true })
      .first();
    this.mobile_login_element = page
      .getByRole("button", { name: /^Log In$/i })
      .filter({ visible: true })
      .first();
    this.mobile_signup_element = page
      .getByRole("button", { name: /^Sign Up$/i })
      .filter({ visible: true })
      .first();
    this.mobile_try_it_for_free_button = page
      .getByRole("button", { name: /try it for free/i })
      .filter({ visible: true })
      .first();
    this.publicTypeSurveyInput = page
      .getByRole("textbox", { name: /Type of survey/i })
      .filter({ visible: true })
      .first();
    this.publicAudienceInput = page
      .getByRole("textbox", { name: /Who is the survey for/i })
      .filter({ visible: true })
      .first();
    this.publicSurveyUseInput = page
      .getByRole("textbox", { name: /For what is the survey used/i })
      .filter({ visible: true })
      .first();

    // Login / signup
    this.loginHeading = page.getByText("Log in to your account", { exact: true });
    this.signupHeading = page.getByText("Sign Up for Hercules", { exact: true });
    this.mobile_login_email_input_field = page.getByPlaceholder(/Enter your email/i);
    this.mobile_login_password_input_field = page.getByPlaceholder(
      /Enter your password/i
    );
    this.mobile_login_login_button = page
      .getByRole("button", { name: /^Log In$/i })
      .filter({ visible: true })
      .first();
    this.signupEmailInput = page.getByPlaceholder(/Enter your email/i);
    this.signupPasswordInput = page.getByPlaceholder(/^Enter your password$/i);
    this.signupConfirmPasswordInput = page.getByPlaceholder(/Confirm password/i);
    this.signupTermsCheckbox = page.locator('input[type="checkbox"]').first();
    this.googleButton = page
      .getByRole("button", { name: /continue with google/i })
      .first();

    // Authenticated mobile home
    this.profileIcon = page.locator("img[alt='nav-profile']").first();
    this.authPromptInput = page.locator("#prompt").first();
    this.uploadButton = page.getByRole("button", { name: /upload button/i }).first();
    this.quickSearchButton = page
      .getByRole("button", { name: /quick search/i })
      .first();
    this.submitPromptButton = page
      .locator("button[aria-label='submit button']")
      .first();

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
      .getByRole("button", { name: /work card Templates/i })
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
    this.profileSettings = this.profilePopup
      .getByRole("heading", { name: /^Settings$/i })
      .first();
    this.profileHelp = this.profilePopup
      .getByRole("heading", { name: /^Help$/i })
      .first();
    this.profileDashboard = this.profilePopup
      .getByRole("heading", { name: /^Dashboard$/i })
      .first();
    this.profileLogout = this.profilePopup
      .getByRole("heading", { name: /^Logout$/i })
      .first();
  }

  async launchTheBrowser() {
    await this.page.goto(this.aiUrl, { waitUntil: "domcontentloaded" });
  }

  async verifyMobileHomePage() {
    await expect(this.mainHeading).toBeVisible({ timeout: 15000 });
    await expect(this.heroHeading).toBeVisible();
    await expect(this.mobile_login_element).toBeVisible();
    await expect(this.mobile_signup_element).toBeVisible();
  }

  async verifyPublicPromptBuilder() {
    await expect(this.mobile_try_it_for_free_button).toBeVisible();
    await this.mobile_try_it_for_free_button.click();
    await expect(this.publicTypeSurveyInput).toBeVisible({ timeout: 15000 });
    await expect(this.publicAudienceInput).toBeVisible();
    await expect(this.publicSurveyUseInput).toBeVisible();
  }

  async verifyLoginButton() {
    await expect(this.mobile_login_element).toBeVisible({ timeout: 15000 });
    await expect(this.mobile_login_element).toBeEnabled();
  }

  async verifySignupButton() {
    await expect(this.mobile_signup_element).toBeVisible({ timeout: 15000 });
    await expect(this.mobile_signup_element).toBeEnabled();
  }

  async clickLogin() {
    await this.verifyLoginButton();
    await this.mobile_login_element.click();
    await expect(this.page).toHaveURL(/\/login\?next=(?:\/ai|%2Fai)$/i, {
      timeout: 15000,
    });
    await expect(this.loginHeading).toBeVisible({ timeout: 15000 });
  }

  async clickSignup() {
    await this.verifySignupButton();
    await this.mobile_signup_element.click();
    await expect(this.page).toHaveURL(/\/signup\?next=(?:\/ai|%2Fai)$/i, {
      timeout: 15000,
    });
    await expect(this.signupHeading).toBeVisible({ timeout: 15000 });
  }

  async verifyLoginPageFields() {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.googleButton).toBeVisible();
    await expect(this.mobile_login_email_input_field).toBeVisible();
    await expect(this.mobile_login_password_input_field).toBeVisible();
    await expect(this.mobile_login_login_button).toBeVisible();
  }

  async verifySignupPageFields() {
    await expect(this.signupHeading).toBeVisible();
    await expect(this.googleButton).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
    await expect(this.signupPasswordInput).toBeVisible();
    await expect(this.signupConfirmPasswordInput).toBeVisible();
    await expect(this.signupTermsCheckbox).toBeVisible();
  }

  async mobileLogin(email = this.email, password = this.password) {
    await this.clickLogin();
    await this.mobile_login_email_input_field.fill(email);
    await this.mobile_login_password_input_field.fill(password);
    await expect(this.mobile_login_login_button).toBeEnabled();
    await this.mobile_login_login_button.click();
    await expect(this.profileIcon).toBeVisible({ timeout: 30000 });
    await expect(this.authPromptInput).toBeVisible({ timeout: 30000 });
  }

  async verifyAfterLoginHome() {
    await expect(this.page).toHaveURL(/\/ai\/?$/i);
    await expect(this.profileIcon).toBeVisible();
    await expect(this.authPromptInput).toBeVisible();
    await expect(this.mobile_login_element).toBeHidden();
  }

  async verifyAuthenticatedPromptControls() {
    const prompt = `Create a mobile web survey ${Date.now()}`;

    await expect(this.authPromptInput).toBeVisible();
    await this.authPromptInput.fill(prompt);
    await expect(this.authPromptInput).toHaveValue(prompt);
    await expect(this.uploadButton).toBeVisible();
    await expect(this.quickSearchButton).toBeVisible();
    await expect(this.submitPromptButton).toBeVisible();
  }

  async verifyMobileDashboardSurveyCards() {
    await expect(this.dashboardTitle).toBeVisible({ timeout: 15000 });
    await expect(this.dashboardSearchInput).toBeVisible();
    await expect(this.dashboardFilterDropdown).toBeVisible();
    await expect(this.dashboardSortDropdown).toBeVisible();
    await expect(this.draftStatus).toBeVisible();
    await expect(this.pausedStatus).toBeVisible();
    await expect(this.firstSurveyCardMenu).toBeVisible();
  }

  async verifyMobileDashboardSearch() {
    const searchTerm = "India Insurance";

    await expect(this.dashboardSearchInput).toBeVisible({ timeout: 15000 });
    await this.dashboardSearchInput.fill(searchTerm);
    await expect(this.dashboardSearchInput).toHaveValue(searchTerm);
    await expect(
      this.page.getByText(/India Insurance Digital Adoption & Trust Study/i).first()
    ).toBeVisible({ timeout: 15000 });
    await this.dashboardSearchInput.fill("");
    await expect(this.dashboardSearchInput).toHaveValue("");
  }

  async verifyMobileSurveyCardMenu() {
    await expect(this.firstSurveyCardMenu).toBeVisible({ timeout: 15000 });
    await this.firstSurveyCardMenu.click();
    await expect(this.surveyCardDuplicateOption).toBeVisible({ timeout: 15000 });
    await expect(this.surveyCardRenameOption).toBeVisible();
    await expect(this.surveyCardSettingsOption).toBeVisible();
    await expect(this.surveyCardDeleteOption).toBeVisible();
  }

  async verifyMobileSurveyResources() {
    await expect(this.surveyResourcesHeading).toBeVisible({ timeout: 15000 });
    await expect(this.surveyResourcesViewAll).toBeVisible();
    await expect(this.researchTemplatesCard).toBeVisible();
    await expect(this.savedAudiencesCard).toBeVisible();
    await expect(this.allTemplatesFilter).toBeVisible();
    await expect(this.communityImpactFilter).toBeVisible();
    await expect(this.newIdeaTestingFilter).toBeVisible();
    await expect(this.firstTemplateCard).toBeVisible();
  }

  async verifyMobileResearchTemplatesFunctionality() {
    await expect(this.researchTemplatesCard).toBeVisible({ timeout: 15000 });
    await this.researchTemplatesCard.click();
    await expect(this.allTemplatesFilter).toBeVisible();
    await expect(this.firstTemplateCard).toBeVisible();

    await this.communityImpactFilter.click();
    await expect(this.communityTemplateCard).toBeVisible({ timeout: 15000 });

    await this.newIdeaTestingFilter.click();
    await expect(this.newIdeaTemplateCard).toBeVisible({ timeout: 15000 });
  }

  async verifyMobileSavedAudiencesFunctionality() {
    await expect(this.savedAudiencesCard).toBeVisible({ timeout: 15000 });
    await this.savedAudiencesCard.click();
    await expect(
      this.page
        .getByText(/Saved Audiences|Saved Audience|No saved audiences|Audience/i)
        .first()
    ).toBeVisible({ timeout: 15000 });
  }

  async verifyMobileProfileMenu() {
    await expect(this.profileIcon).toBeVisible({ timeout: 15000 });
    await this.profileIcon.click();
    await expect(this.profilePopup).toBeVisible({ timeout: 15000 });
    await expect(this.profileCredits).toBeVisible();
    await expect(this.profileSettings).toBeVisible();
    await expect(this.profileHelp).toBeVisible();
    await expect(this.profileDashboard).toBeVisible();
    await expect(this.profileLogout).toBeVisible();
  }
}
