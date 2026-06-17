import { expect } from "@playwright/test";

export class Signup_model {
  constructor(page) {
    this.page = page;

    this.signupButton = page.getByRole("button", { name: /^sign up$/i });
    this.heading = page.getByText("Sign Up for Hercules");
    this.subheading = page.getByText("Create a Hercules account");
    this.googleButton = page.getByRole("button", {
      name: /continue with google/i,
    });
    this.emailfield = page.getByPlaceholder(/Enter your email/i);
    this.passwordfield = page.getByPlaceholder(/^Enter your password$/i);
    this.confirmPasswordfield = page.getByPlaceholder(/Confirm password/i);
    this.termsCheckbox = page.locator('input[type="checkbox"]').first();
    this.termsLink = page.getByText("Terms of Service", { exact: true }).first();
    this.privacyLink = page.getByText("Privacy Policy", { exact: true }).first();
    this.loginSwitch = page.getByText("Log In", { exact: true }).first();
  }

  async openSignupForm() {
    await expect(this.signupButton.first()).toBeVisible();
    await expect(this.signupButton.first()).toBeEnabled();
    await this.signupButton.first().click();
    await expect(this.page).toHaveURL(
      /^https:\/\/hercules\.works\/signup\?next=(?:\/ai|%2Fai)$/i
    );
  }

  async verifySignupPageElements() {
    await expect(this.heading).toBeVisible();
    await expect(this.subheading).toBeVisible();
    await expect(this.googleButton).toBeVisible();
    await expect(this.googleButton).toBeEnabled();
    await expect(this.emailfield).toBeVisible();
    await expect(this.emailfield).toBeEnabled();
    await expect(this.passwordfield).toBeVisible();
    await expect(this.passwordfield).toBeEnabled();
    await expect(this.confirmPasswordfield).toBeVisible();
    await expect(this.confirmPasswordfield).toBeEnabled();
    await expect(this.termsCheckbox).toBeVisible();
    await expect(this.termsCheckbox).toBeEnabled();
    await expect(this.termsLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
  }

  async fillSignupForm(email, password) {
    await this.emailfield.fill(email);
    await this.passwordfield.fill(password);
    await this.confirmPasswordfield.fill(password);
    await this.termsCheckbox.check();
  }

  async verifySignupButtonEnabled() {
    await expect(this.signupButton).toBeEnabled();
  }

  async switchToLogin() {
    await expect(this.loginSwitch).toBeVisible();
    await expect(this.loginSwitch).toBeEnabled();
    await this.loginSwitch.click();
  }
}
