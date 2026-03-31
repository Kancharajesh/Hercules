import { test, expect } from "@playwright/test";

export class without_login {
  constructor(page) {
    this.page = page;

    // Login button
    this.Pricing = "//li[normalize-space()='Pricing']";

    // SignUp button
    this.Research = "//li[normalize-space()='Research']";

    // SignUp button
    this.Aboutus = "//li[normalize-space()='About Us']";


    // Input field container
    this.ShowinputField = "//div[@class='w-full flex justify-center mb-8 flex-col items-center']";
  }

  async launchTheBrowser() {
    await this.page.goto(
      "https://hercules.works/ai"
    );
  }

  // Login button clickable
  async login_button() {
    await this.page.locator(this.Pricing).click();
  }

  // Login button visible
  async login_button_visible() {
    await expect(this.page.locator(this.Pricing)).toBeVisible();
  }

  // Login button visible
  async Aboutus_visible() {
    await expect(this.page.locator(this.Aboutus)).toBeVisible();
  }


  // Signup button clickable
  async signup_button() {
    await this.page.locator(this.Research).click();
  }

  // Signup button visible
  async signup_button_visible() {
    await expect(this.page.locator(this.Research)).toBeVisible();
  }

  // Show input field visible
  async show_input_field() {
    await expect(this.page.locator(this.ShowinputField)).toBeVisible();
  }
}
 