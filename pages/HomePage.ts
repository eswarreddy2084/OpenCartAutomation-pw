import { Page, Locator } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  private readonly myAccountLink: Locator;
  private readonly register: Locator;
  private readonly login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = this.page.getByRole("link", { name: " My Account" });
    this.register = this.page.getByRole("link", { name: "Register" }).first();
    this.login = this.page.getByRole("link", { name: "Login" }).first();
  }
  async isHomePageExist() {
    const title: string = await this.page.title();
    if (title === "Your Store") {
      return true;
    }
    return false;
  }
  async clickMyAccountLink() {
    try {
      await this.myAccountLink.click();
    } catch (error) {
      console.log("Exception occured while clicking my account link", error);
      throw error;
    }
  }
  async clickRegisterLink() {
    try {
      await this.register.click();
    } catch (error) {
      console.log("Exception occured while clicking register link", error);
      throw error;
    }
  }
  async clickLogin() {
    try {
      await this.login.click();
    } catch (error) {
      console.log("Exception occured while clicking Login link", error);
      throw error;
    }
  }
}
