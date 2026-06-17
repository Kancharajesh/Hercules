import { expect } from "@playwright/test";

const DEFAULT_ORIGIN = "https://hercules.works";

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

export class WebsiteSections_model {
  constructor(page) {
    this.page = page;

    const targetAiUrl = process.env.TARGET_URL || `${DEFAULT_ORIGIN}/ai`;
    this.baseUrl = trimTrailingSlash(
      process.env.TARGET_ORIGIN || new URL(targetAiUrl).origin
    );
    this.aiUrl = process.env.TARGET_URL || `${this.baseUrl}/ai`;

    // AI homepage visible sections
    this.aiMainHeading = page
      .getByRole("heading", { name: /Hercules AI Research Assistant/i })
      .filter({ visible: true })
      .first();
    this.aiHeroHeading = page
      .getByRole("heading", { name: /Hercules works for/i })
      .filter({ visible: true })
      .first();
    this.loginButton = page
      .getByRole("button", { name: /^Log In$/i })
      .filter({ visible: true })
      .first();
    this.signupButton = page
      .getByRole("button", { name: /^Sign Up$/i })
      .filter({ visible: true })
      .first();
    this.tryItForFreeButton = page
      .getByRole("button", { name: /Try it for free/i })
      .filter({ visible: true })
      .first();
    this.typeSurveyInput = page
      .getByRole("textbox", { name: /Type of survey/i })
      .filter({ visible: true })
      .first();
    this.audienceInput = page
      .getByRole("textbox", { name: /Who is the survey for/i })
      .filter({ visible: true })
      .first();
    this.surveyUseInput = page
      .getByRole("textbox", { name: /For what is the survey used/i })
      .filter({ visible: true })
      .first();
    this.getSuggestionsButton = page
      .getByRole("button", { name: /^Get suggestions$/i })
      .filter({ visible: true })
      .first();
    this.writePromptButton = page
      .getByRole("button", { name: /Write a prompt/i })
      .filter({ visible: true })
      .first();
    this.aboutSectionHeading = page
      .getByRole("heading", { name: /^About$/i })
      .filter({ visible: true })
      .first();
    this.libraryHeading = page
      .getByRole("heading", { name: /^Library$/i })
      .filter({ visible: true })
      .first();
    this.viewAllResourcesLink = page
      .getByRole("link", { name: /View All Resources/i })
      .filter({ visible: true })
      .first();

    // Research page sections
    this.researchHeading = page
      .getByRole("heading", { name: /Market Research Solutions/i })
      .filter({ visible: true })
      .first();
    this.researchPricingLink = page
      .getByRole("link", { name: /View Pricing/i })
      .filter({ visible: true })
      .first();
    this.researchBlogLink = page
      .getByRole("link", { name: /Research Blog/i })
      .filter({ visible: true })
      .first();
    this.researchAiLink = page
      .getByRole("link", { name: /Try Hercules AI|Try AI Research Assistant/i })
      .filter({ visible: true })
      .first();

    // Pricing page sections
    this.pricingHeading = page
      .getByRole("heading", { name: /Upgrade Your Plan/i })
      .filter({ visible: true })
      .first();
    this.monthlyToggle = page
      .getByRole("button", { name: /^Monthly$/i })
      .filter({ visible: true })
      .first();
    this.annualToggle = page
      .getByRole("button", { name: /Annual 20% off/i })
      .filter({ visible: true })
      .first();
    this.freePlanHeading = page
      .getByRole("heading", { name: /^Free Plan$/i })
      .filter({ visible: true })
      .first();
    this.starterPlanHeading = page
      .getByRole("heading", { name: /^Starter$/i })
      .filter({ visible: true })
      .first();
    this.proPlanHeading = page
      .getByRole("heading", { name: /^Pro$/i })
      .filter({ visible: true })
      .first();
    this.enterprisePlanHeading = page
      .getByRole("heading", { name: /^Enterprise$/i })
      .filter({ visible: true })
      .first();
    this.getStartedButtons = page.getByRole("button", { name: /^Get Started$/i });

    // About page sections
    this.aboutHeading = page
      .getByRole("heading", {
        name: /About Jupiter Meta Labs.*The Team Behind Hercules AI/i,
      })
      .filter({ visible: true })
      .first();
    this.aboutMissionHeading = page
      .getByRole("heading", { name: /We're making human intelligence/i })
      .filter({ visible: true })
      .first();
    this.aboutJupiterHeading = page
      .getByRole("heading", { name: /About Jupiter Meta Labs/i })
      .filter({ visible: true })
      .first();
  }

  urlFor(path) {
    return `${this.baseUrl}${path}`;
  }

  visibleText(text, options = {}) {
    return this.page.getByText(text, options).filter({ visible: true }).first();
  }

  async verifyVisible(locator, label) {
    await expect(locator, `${label} should be visible`).toBeVisible({
      timeout: 15000,
    });
  }

  async verifyTextVisible(text, options = {}) {
    await this.verifyVisible(
      this.visibleText(text, options),
      `Text "${String(text)}"`
    );
  }

  async openAiPage() {
    await this.page.goto(this.aiUrl, { waitUntil: "domcontentloaded" });
    await this.verifyVisible(this.aiMainHeading, "AI page main heading");
  }

  async openResearchPage() {
    await this.page.goto(this.urlFor("/research"), {
      waitUntil: "domcontentloaded",
    });
    await this.verifyVisible(this.researchHeading, "Research page heading");
  }

  async openPricingPage() {
    await this.page.goto(this.urlFor("/pricing"), {
      waitUntil: "domcontentloaded",
    });
    await this.verifyVisible(this.pricingHeading, "Pricing page heading");
  }

  async openAboutPage() {
    await this.page.goto(this.urlFor("/about"), { waitUntil: "domcontentloaded" });
    await this.verifyVisible(this.aboutHeading, "About page heading");
  }

  async verifyAiHeaderHeroAndPromptSection() {
    await this.verifyVisible(this.aiMainHeading, "AI main heading");
    await this.verifyVisible(this.loginButton, "Login button");
    await this.verifyVisible(this.signupButton, "Signup button");
    await this.verifyVisible(this.aiHeroHeading, "AI hero heading");
    await this.verifyTextVisible(/Your research assistant for data-backed/i);
    await this.verifyVisible(this.tryItForFreeButton, "Try it for free button");
    await this.verifyTextVisible("Create a", { exact: true });
    await this.verifyVisible(this.typeSurveyInput, "Type of survey input");
    await this.verifyVisible(this.audienceInput, "Audience input");
    await this.verifyVisible(this.surveyUseInput, "Survey use input");
    await this.verifyVisible(this.getSuggestionsButton, "Get suggestions button");
    await this.verifyVisible(this.writePromptButton, "Write a prompt button");
  }

  async verifyAiAboutLibraryTemplatesAndFooterSections() {
    await this.verifyVisible(this.aboutSectionHeading, "AI About heading");
    await this.verifyTextVisible(/Hercules AI is the only end-to-end/i);
    await this.verifyVisible(this.libraryHeading, "Library heading");
    await this.verifyTextVisible(/Empower your research with data-driven insights/i);
    await this.verifyVisible(this.viewAllResourcesLink, "View All Resources link");
    await this.verifyTextVisible(/How to Improve Data Collection with Online Surveys/i);
    await this.verifyTextVisible("Templates", { exact: true });
    await this.verifyTextVisible("all", { exact: true });
    await this.verifyTextVisible("augmented reality experiences", { exact: true });
    await this.verifyTextVisible("community & social impact", { exact: true });
    await this.verifyTextVisible(/Evil Huntar AR Game Concept Testing/i);
    await this.verifyTextVisible(/Women's Decision-Making in Indian Families/i);
    await this.verifyTextVisible("Products", { exact: true });
    await this.verifyTextVisible("Company", { exact: true });
    await this.verifyTextVisible(/JOIN OUR MAILING LIST/i);
  }

  async verifyResearchCaseStudiesSection() {
    await this.verifyVisible(this.researchHeading, "Research heading");
    await this.verifyTextVisible(/From Dairy Giant to Wellness Player/i);
    await this.verifyTextVisible(
      "Finding the Right Face: ICICI Prudential's Brand Ambassador Search",
      { exact: true }
    );
    await this.verifyTextVisible(/What First-Time Investors Want/i);
    await this.verifyTextVisible(/Greenply vs\. The Market/i);
    await this.verifyTextVisible(/Before the Launch/i);
    await this.verifyTextVisible(/3-hour dipstick study/i);
  }

  async verifyResearchCtaLinks() {
    await this.verifyVisible(this.researchPricingLink, "Research pricing link");
    await this.verifyVisible(this.researchBlogLink, "Research blog link");
    await this.verifyVisible(this.researchAiLink, "Research AI link");
  }

  async verifyPricingPlansSection() {
    await this.verifyVisible(this.pricingHeading, "Pricing heading");
    await this.verifyVisible(this.monthlyToggle, "Monthly pricing toggle");
    await this.verifyVisible(this.annualToggle, "Annual pricing toggle");
    await this.verifyVisible(this.freePlanHeading, "Free plan heading");
    await this.verifyVisible(this.starterPlanHeading, "Starter plan heading");
    await this.verifyVisible(this.proPlanHeading, "Pro plan heading");
    await this.verifyVisible(this.enterprisePlanHeading, "Enterprise plan heading");
    await this.verifyVisible(this.getStartedButtons.first(), "Get Started button");
    await this.verifyTextVisible(/10 chats per month/i);
    await this.verifyTextVisible(/Access to 300 SuperJ Users per month/i);
    await this.verifyTextVisible(/420 Monthly Credits/i);
    await this.verifyTextVisible(/6,729 Quarterly Credits/i);
    await this.verifyTextVisible(/Custom Pricing/i);
  }

  async verifyPricingFeatureDetailsSection() {
    await this.verifyTextVisible(/Limited Access to Hercules AI Research Agent/i);
    await this.verifyTextVisible(/Access to 20 million SuperJ User Base/i);
    await this.verifyTextVisible(/Access to over 50 verified Consumer Attributes/i);
    await this.verifyTextVisible(/Unlimited access to Hercules AI Research Agent/i);
    await this.verifyTextVisible(/Priority Support/i);
    await this.verifyTextVisible(/Proprietary data remains private/i);
    await this.verifyTextVisible(/Dedicated research expert available 24x7/i);
    await this.verifyTextVisible(/Dedicated data scientist available 24x7/i);
  }

  async verifyAboutStoryTeamAndFooterSections() {
    await this.verifyVisible(this.aboutHeading, "About heading");
    await this.verifyTextVisible(/Traditional surveys are slow, expensive/i);
    await this.verifyTextVisible("Built by Jupiter Meta Labs.", { exact: true });
    await this.verifyTextVisible("Trusted by", { exact: true });
    await this.verifyVisible(this.aboutMissionHeading, "About mission heading");
    await this.verifyTextVisible("Sathyan Rajan", { exact: true });
    await this.verifyTextVisible("Manasa Rajan", { exact: true });
    await this.verifyTextVisible("Satish Pasari", { exact: true });
    await this.verifyTextVisible("Siddhanth Mohandas", { exact: true });
    await this.verifyTextVisible("Kumar Gugloth", { exact: true });
    await this.verifyVisible(this.aboutJupiterHeading, "About Jupiter heading");
    await this.verifyTextVisible("Products", { exact: true });
    await this.verifyTextVisible("Company", { exact: true });
    await this.verifyTextVisible(/Privacy Policy|Privacy/i);
    await this.verifyTextVisible(/Terms & Conditions|Terms/i);
  }

  async verifyMainLinksHaveValidHref(maxLinks = 50) {
    const links = this.page.locator("a[href]");
    const count = await links.count();
    expect(count, "Page should expose links").toBeGreaterThan(0);

    const invalidLinks = [];
    const linksToCheck = Math.min(count, maxLinks);

    for (let index = 0; index < linksToCheck; index += 1) {
      const href = await links.nth(index).getAttribute("href");
      const normalizedHref = href?.trim();

      if (
        !normalizedHref ||
        normalizedHref === "#" ||
        normalizedHref.toLowerCase().startsWith("javascript:")
      ) {
        invalidLinks.push(`link ${index + 1}: ${href}`);
      }
    }

    expect(invalidLinks).toEqual([]);
  }
}
