import { expect } from "@playwright/test";

export class Settings {
  constructor(page) {
    this.page = page;

    // Profile / menu
    this.setting_profile = page.locator("(//img[@alt='nav-profile'])[1]");
    this.profile_popup = page.locator("//div[@class='pt-4 w-full']");

    // Popup menu items
    this.get_free_credits = page.getByText("Get Free Credits");
    this.settings_button = page.getByText("Settings");
    this.help_button = page.getByText("Help");
    this.dashboard_button = page.getByText("Dashboard");
    this.logout_button = page.getByText("Logout");

    // Credits popup
    this.get_free_credits_popup = page.locator("//div[@role='dialog']");
    this.get_free_credits_popup_close = page.locator("//img[@alt='close-modal']");

    // Settings tabs
    this.settings_general = page.getByRole("button", { name: "General" });
    this.settings_account = page.getByRole("button", { name: "Account" });
    this.settings_billing = page.getByRole("button", { name: "Billing" });

    // Settings screen sections
    this.settings_general_screen_view = page.locator(
      "//div[contains(@class,'flex flex-col gap-8')]"
    );

    this.settings_account_screen_view = page.locator(
      "//main//div[contains(@class,'div') or contains(@class,'w-full')]"
    );

    this.settings_billing_screen_view_transactions = page.locator(
      "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)"
    );

    // Help
    this.help_fullscreen = page.locator(
      "div[class='md:pl-24 md:pr-[46px] h-full box-border w-full']"
    );
    this.help_buttons = page.locator("//div[contains(@class,'flex flex-wrap gap-4')]");

    // Logout popup
    this.logout_popup = page.locator("//div[@role='dialog']");
    this.logout_cancel = page.getByRole("button", { name: "Cancel" });
    this.logout_confirm = page.getByRole("button", { name: "Logout" });

    // Credits row in profile popup
    this.profile_credits = page.locator(
      "(//div[@class='flex justify-between w-full border-b border-b-[#E6E4E9] pt-[10px] pb-2'])[1]"
    );
  }

  async launchHome() {
    await this.page.goto("https://hercules.works/ai", {
      waitUntil: "domcontentloaded",
    });
  }

  async openProfileMenu() {
    await expect(this.setting_profile).toBeVisible();
    await this.setting_profile.click();
    await expect(this.profile_popup).toBeVisible();
  }

  async verifyProfilePopup() {
    await expect(this.profile_popup).toBeVisible();
  }

  async verifyProfileCredits() {
    await expect(this.profile_credits).toBeVisible();
  }

  async openFreeCredits() {
    await this.get_free_credits.click();
    await expect(this.get_free_credits_popup).toBeVisible();
  }

  async closeFreeCreditsPopup() {
    await expect(this.get_free_credits_popup_close).toBeVisible();
    await this.get_free_credits_popup_close.click();
  }

async openSettings() {
  await this.settings_button.click();
  // await this.page.waitForURL(/\/settings/);
}

  async openGeneralSettings() {
    await this.page.goto("https://hercules.works/settings?page=general");
  }

  async openAccountSettings() {
    await this.page.goto("https://hercules.works/settings?page=account");
  }

  async openBillingSettings() {
    await this.page.goto("https://hercules.works/settings?page=billing");
  }

  async verifyGeneralSettings() {
    await expect(this.page).toHaveURL("https://hercules.works/settings?page=general");
    await expect(this.settings_general).toBeVisible();
    await expect(this.settings_general_screen_view).toBeVisible();
  }

  async verifyAccountSettings() {
    // await expect(this.page).toHaveURL("https://hercules.works/settings?page=account");
    await expect(this.settings_account).toBeVisible();
  }

  async verifyBillingSettings() {
    // await expect(this.page).toHaveURL("https://hercules.works/settings?page=billing");
    await expect(this.settings_billing).toBeVisible();
    await expect(this.settings_billing_screen_view_transactions).toBeVisible();
  }

  async openHelp() {
    await this.page.goto("https://hercules.works/help");
  }

  async verifyHelpPage() {
    await expect(this.page).toHaveURL("https://hercules.works/help");
    await expect(this.help_fullscreen).toBeVisible();
  }

  async openDashboard() {
    await this.page.goto("https://hercules.works/dashboard");
  }

  async verifyDashboardPage() {
    await expect(this.page).toHaveURL("https://hercules.works/dashboard");
  }

  async clickLogout() {
    await this.logout_button.click();
    await expect(this.logout_popup).toBeVisible();
  }

  async verifyLogoutPopup() {
    await expect(this.logout_popup).toBeVisible();
    await expect(this.logout_cancel).toBeVisible();
    await expect(this.logout_confirm).toBeVisible();
  }

  async cancelLogout() {
    await this.logout_cancel.click();
  }

  async confirmLogout() {
    await this.logout_confirm.click();
  }
}