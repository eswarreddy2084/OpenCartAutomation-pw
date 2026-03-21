import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SearchProductPage } from "../pages/SearchProductPage";
let config: TestConfig;
let homepage: HomePage;
let loginPage: LoginPage;
let searchPage: SearchProductPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homepage = new HomePage(page);
  await homepage.clickMyAccountLink();
  await homepage.clickLogin();
  loginPage = new LoginPage(page);
  await loginPage.Login(config.email, config.password);
  searchPage = new SearchProductPage(page);
});

test("Validate the Success message when adding product to cart @master @sanity @regression", async () => {
  await searchPage.searchProduct(config.productName);
  await searchPage.openProduct(config.product);
  await searchPage.addProductToCart();
  const actualSuccessMessage = await searchPage.getAddToCartMessage();
  const expectedSuccessMessage: string = `Success: You have added ${config.product} to your shopping cart!`;
  expect(actualSuccessMessage).toMatch(expectedSuccessMessage);
});
