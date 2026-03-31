import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;

    // ---------- Header Menu Locators ----------
    this.home = page.locator("//li[normalize-space()='Home']");
    this.research = page.locator("//li[normalize-space()='Research']");
    this.pricing = page.locator("//li[normalize-space()='Pricing']");
    this.aboutUs = page.locator("//li[normalize-space()='About Us']");
    this.superJ = page.locator("//li[normalize-space()='Super J']");

    // ---------- Page Content Locators ----------
    this.researchContent = page.locator(
      "xpath=(//div[contains(@class,'md:max-w') and contains(@class,'mx-auto')])[1]"
    );

    this.aboutUsContent = page.locator(
      "xpath=(//div[contains(@class,'border-t') and contains(@class,'border-b') and contains(@class,'text-center')])[1]"
    );

    // ---------- Pricing ----------
    this.pricingClose = page.locator("//img[@alt='cross']");

    // ⚠️ Your current locators are index based (fragile, but keeping as you gave)
    this.pricingFree = page.locator("(//div)[18]");
    this.pricingMonthly = page.locator("(//div)[40]");
    this.pricingAnnually = page.locator("(//div)[74]");
    this.pricingEnterprise = page.locator(
      "(//div[contains(@class,'border border-opacity-80 border-[#DCDCDC] rounded-[28px] w-full p-6 md:p-8 shadow-[0rem_.0625rem_2.625rem_0rem_rgba(0,0,0,0.07)] min-w-[18.75rem]')])[1]"
    );
  }

  // ---------- Launch Application ----------
  async launchTheBrowser() {
    await this.page.goto("https://hercules.works/ai", {
      waitUntil: "domcontentloaded",
    });
  }

  // ---------- Common Validation Method ----------
  async validateVisibleAndEnabled(locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
  }

  // ---------- Home ----------
  async home_visible() {
    await this.validateVisibleAndEnabled(this.home);
  }

  async home_click() {
    await this.home.click();
  }

  // ---------- Research ----------
  async research_visible() {
    await this.validateVisibleAndEnabled(this.research);
  }

  async research_click() {
    await this.research.click();
    await expect(this.researchContent).toBeVisible({ timeout: 15000 });
  }

  // ---------- Pricing ----------
  async pricing_visible() {
    await this.validateVisibleAndEnabled(this.pricing);
  }

  async pricing_click() {
    await this.pricing.click();
    await expect(this.pricingClose.first()).toBeVisible({ timeout: 15000 });
  }

  async pricing_free_visible() {
    await expect(this.pricingFree.first()).toBeVisible({ timeout: 15000 });
  }

  async pricing_monthly_visible() {
    await expect(this.pricingMonthly.first()).toBeVisible({ timeout: 15000 });
  }

  async pricing_annually_visible() {
    await expect(this.pricingAnnually.first()).toBeVisible({ timeout: 15000 });
  }

  async pricing_enterprise_visible() {
    await expect(this.pricingEnterprise.first()).toBeVisible({ timeout: 15000 });
  }

  async pricing_close_click() {
    await expect(this.pricingClose.first()).toBeVisible({ timeout: 15000 });
    await this.pricingClose.first().click();
    await expect(this.pricingClose.first()).toBeHidden({ timeout: 15000 });
  }

  // ---------- About Us ----------
  async aboutus_visible() {
    await this.validateVisibleAndEnabled(this.aboutUs);
  }

  async aboutus_click() {
    await this.aboutUs.click();
    await expect(this.aboutUsContent).toBeVisible({ timeout: 15000 });
  }

  // ---------- Super J ----------
  async superj_visible() {
    await this.validateVisibleAndEnabled(this.superJ);
  }

  async superj_click() {
    await this.superJ.click();
  }
}
