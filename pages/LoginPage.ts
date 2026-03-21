import { Page, Locator } from "@playwright/test";
import { error } from "node:console";
import { promises } from "node:dns";
export class LoginPage {
  private readonly page: Page;
  private readonly txtEmailAddress: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly lnkLogout: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtEmailAddress = this.page.locator("#input-email");
    this.txtPassword = this.page.locator("#input-password");
    this.btnLogin = this.page.getByRole("button", { name: "Login" });
    this.lnkLogout = this.page.getByRole("link", { name: "Logout" }).last();
    this.errorMsg = this.page.locator(".alert.alert-danger.alert-dismissible");
  }
  async Login(emailAddress: string, password: string) {
    try {
      await this.txtEmailAddress.fill(emailAddress);
      await this.txtPassword.fill(password);
      await this.btnLogin.click();
    } catch (error) {
      console.log("error occured while loging in to application", error);
    }
  }

  async isAccountExist(): Promise<boolean> {
    try {
      await this.lnkLogout.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
  async getErrorMessage(): Promise<string> {
    const errorMessage: string = (await this.errorMsg.innerText()).trim();
    return errorMessage;
  }
}
