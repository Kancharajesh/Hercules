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

    // validation messages
    this.email_message = page.getByText("Email is required");
    this.password_message = page.getByText("Password is required");
  }

  async launchTheBrowser() {
    await this.page.goto("https://hercules.works/ai", { waitUntil: "domcontentloaded" });
  }

  async openLoginForm() {
    await expect(this.loginBtn).toBeVisible();
    await this.loginBtn.click();
    await expect(this.emailfield).toBeVisible();
  }

  async login(email, password) {
    await this.emailfield.fill(email);
    await this.passwordfield.fill(password);
    await this.signInbutton.click();
  }

  async clickLoginOnly() {
    await this.signInbutton.click();
  }
}
