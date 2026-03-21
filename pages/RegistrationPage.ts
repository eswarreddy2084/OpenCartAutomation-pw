import { Page, Locator } from "@playwright/test";
import { RandomDataUtil } from "../utils/RandomDataGenerator";
export class RegistrationPage {
  private readonly page: Page;
  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtEmail: Locator;
  private readonly txtTelephone: Locator;
  private readonly txtPassword: Locator;
  private readonly txtNewPassword: Locator;
  private readonly agreeTermsAndConditions: Locator;
  private readonly btnContinue: Locator;
  private readonly confirmMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = this.page.getByRole("textbox", { name: "First Name" });
    this.txtLastName = this.page.getByRole("textbox", { name: "Last Name" });
    this.txtEmail = this.page.getByRole("textbox", { name: "E-Mail" });
    this.txtTelephone = this.page.getByRole("textbox", { name: "Telephone" });
    this.txtPassword = this.page.locator("#input-password");
    this.txtNewPassword = this.page.getByLabel("Password Confirm");
    this.agreeTermsAndConditions = this.page.locator('[name="agree"]');
    this.btnContinue = this.page.locator("input[value='Continue']");
    this.confirmMessage = this.page.getByRole("heading", {
      name: "Your Account Has Been Created!",
    });
  }
  async completeRegistration() {
    await this.txtFirstName.fill(RandomDataUtil.getFirstName());
    await this.txtLastName.fill(RandomDataUtil.getLastName());
    await this.txtEmail.fill(RandomDataUtil.getEmail());
    await this.txtTelephone.fill(RandomDataUtil.getPhoneNumber());
    const password = RandomDataUtil.getPassword();
    await this.txtPassword.fill(password);
    await this.txtNewPassword.fill(password);
    await this.agreeTermsAndConditions.check();
    await this.btnContinue.click();
  }
  async getConfirmationMessage() {
    return (await this.confirmMessage.textContent()) ?? "";
  }
}
