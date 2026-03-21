import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/DataProvider";
import { config } from "node:process";

const JsonPath: string = "data/loginData.json";

const JsonTestData = DataProvider.readDataFromJson(JsonPath);

for (const data of JsonTestData) {
  test(`validate login with ${data.email} and ${data.password} @dataDriven`, async ({
    page,
  }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);
    // navigating to login page
    const homePage = new HomePage(page);
    await homePage.clickMyAccountLink();
    await homePage.clickLogin();

    // perform login with the Json set of data

    const loginPage = new LoginPage(page);
    await loginPage.Login(data.email, data.password);
    if (data.expected.toLowerCase() === "success") {
      expect(await loginPage.isAccountExist()).toBeTruthy();
    } else {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe(
        "Warning: No match for E-Mail Address and/or Password.",
      );
    }
  });
}
