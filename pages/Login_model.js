import { expect } from "@playwright/test";

export class Login_model {
  constructor(page) {
    this.page = page;

    // button on landing page
    this.loginBtn = page.getByRole("button", { name: /^log in$/i });

    // fields on login form
    this.emailfield = page.getByPlaceholder(/Enter your email/i);
    this.passwordfield = page.getByPlaceholder(/Enter your password/i);
    this.signInbutton = page.getByRole("button", { name: /^log in$/i });
    this.googleButton = page.getByRole("button", {
      name: /continue with google/i,
    });
    this.heading = page.getByText("Log in to your account");
    this.forgotPassword = page.getByText("Forgot Password?", { exact: true });
    this.signupSwitch = page.getByText("Sign Up", { exact: true }).first();

    // validation messages
    this.email_message = page.getByText("Email is required");
    this.password_message = page.getByText("Password is required");
  }

  async launchTheBrowser() {
    await this.page.goto("https://hercules.works/ai", { waitUntil: "domcontentloaded" });
  }

  async openLoginForm() {
    await expect(this.loginBtn).toBeVisible();
    await expect(this.loginBtn).toBeEnabled();
    await this.loginBtn.click();
    await expect(this.emailfield).toBeVisible();
  }

  async verifyLoginPageElements() {
    await expect(this.page).toHaveURL(
      /^https:\/\/hercules\.works\/login\?next=(?:\/ai|%2Fai)$/i
    );
    await expect(this.heading).toBeVisible();
    await expect(this.googleButton).toBeVisible();
    await expect(this.googleButton).toBeEnabled();
    await expect(this.emailfield).toBeVisible();
    await expect(this.emailfield).toBeEnabled();
    await expect(this.passwordfield).toBeVisible();
    await expect(this.passwordfield).toBeEnabled();
    await expect(this.signInbutton).toBeVisible();
    await expect(this.forgotPassword).toBeVisible();
    await expect(this.signupSwitch).toBeVisible();
    await expect(this.signupSwitch).toBeEnabled();
  }

  async verifyLoginButtonEnabled() {
    await expect(this.signInbutton).toBeEnabled();
  }

  async login(email, password) {
    await this.emailfield.fill(email);
    await this.passwordfield.fill(password);
    await this.signInbutton.click();
  }

  async clickLoginOnly() {
    await this.signInbutton.click();
  }

  async switchToSignup() {
    await expect(this.signupSwitch).toBeVisible();
    await expect(this.signupSwitch).toBeEnabled();
    await this.signupSwitch.click();
  }
}
