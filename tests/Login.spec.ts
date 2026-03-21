import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "@playwright/test";

let config: TestConfig;
let homePage: HomePage;
let loginpage: LoginPage;

//Before Each hook to navigate to LoginPage
test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  //   Navigating to HomePage
  homePage = new HomePage(page);
  await homePage.clickMyAccountLink();
  await homePage.clickLogin();

  //creating object for pages
  loginpage = new LoginPage(page);
});

test("Validate Login with Valid Data @master @sanity @regression", async () => {
  await loginpage.Login(config.email, config.password);
  let isLogedIn: boolean = await loginpage.isAccountExist();
  expect(isLogedIn).toBeTruthy();
});
