import { Page, test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
let homepage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  //Launching the App URL
  const config = new TestConfig();
  await page.goto(config.appUrl);
  //creating object for Pages
  homepage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test("Validate Home page is visible after launching the URL @sanity", async ({
  page,
}) => {
  expect(await homepage.isHomePageExist()).toBe(true);
});

test("Validate New User Registration Flow @master @sanity @regression", async ({
  page,
}) => {
  const config = new TestConfig();
  await page.goto(config.appUrl);

  // Navigating to Registration page from Home Page
  await homepage.clickMyAccountLink();
  await homepage.clickRegisterLink();

  //complete registration flow
  await registrationPage.completeRegistration();
  //Asserting the Account creation success message
  const actualSuccessMessage: string =
    await registrationPage.getConfirmationMessage();
  expect(actualSuccessMessage).toBe("Your Account Has Been Created!");
});
