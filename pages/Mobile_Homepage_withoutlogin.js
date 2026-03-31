import { expect } from "@playwright/test";

export class Mobile_Homepage_withoutlogin {
  constructor(page) {
    this.page = page;

    this.mobile_login_element = page.locator("(//button[normalize-space()='Log In'])[1]");
    this.mobile_signup_element = page.locator("(//button[normalize-space()='Sign Up'])[1]");

    this.mobile_page_visible = page.locator(
      "xpath=(//div[contains(@class,'md:min-h-screen') and contains(@class,'bg-white')])[1]"
    );

    this.mobile_chat_write_prompt_button = page.locator(
      "(//span[normalize-space()='Write a prompt'])[2]"
    );

    this.mobile_chat_send_button = page.locator("(//button[contains(@aria-label,'submit button')])[1]");
    this.mobile_manually_chat_input = page.locator("(//textarea[@id='prompt'])[1]");

    this.mobile_try_it_for_free_button = page.getByRole("button", { name: /try it for free/i });

    this.mobile_login_page_visible = page.locator(
      "//div[@class='w-full lg:w-1/2 flex flex-col justify-center items-start px-6 sm:px-10 lg:pl-36 lg:pr-[161px] pt-14 sm:pt-20 lg:pt-0']"
    );

    this.mobile_signup_page_visible = page.locator(
      "//div[@class='w-full lg:w-1/2 flex flex-col justify-center items-start px-6 sm:px-10 lg:pl-36 lg:pr-[161px] pt-14 sm:pt-20 lg:pt-0']"
    );

    this.mobile_login_email_input_field = page.locator("(//input[@placeholder='Enter your email'])[1]");
    this.mobile_login_password_input_field = page.locator("(//input[@placeholder='Enter your password'])[1]");
    this.mobile_login_login_button = page.locator("(//button[normalize-space()='Log In'])[1]");

    this.mobile_after_login_top_bar = page.locator("(//div)[8]");
  }

  async launchTheBrowser() {
    await this.page.goto("https://hercules.works/ai", {
      waitUntil: "domcontentloaded",
    });
  }

  async validateVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async validateVisibleAndEnabled(locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
  }

  async verifyMobileHomePage() {
    await this.validateVisible(this.mobile_page_visible);
  }

  async verifyLoginButton() {
    await this.validateVisibleAndEnabled(this.mobile_login_element);
  }

  async verifySignupButton() {
    await this.validateVisibleAndEnabled(this.mobile_signup_element);
  }

  async clickLogin() {
    await this.mobile_login_element.click();
    await this.validateVisible(this.mobile_login_page_visible);
  }

  async clickSignup() {
    await this.mobile_signup_element.click();
    await this.validateVisible(this.mobile_signup_page_visible);
  }

  async clickTryItForFree() {
    await this.mobile_try_it_for_free_button.click();
  }

  async enterPrompt(text) {
    await this.mobile_manually_chat_input.fill(text);
  }

  async clickSend() {
    await this.mobile_chat_send_button.click();
  }

  async mobileLogin(email, password) {
    await this.mobile_login_email_input_field.fill(email);
    await this.mobile_login_password_input_field.fill(password);
    await this.mobile_login_login_button.click();
  }

  async verifyAfterLoginTopBar() {
    await this.validateVisible(this.mobile_after_login_top_bar);
  }
}