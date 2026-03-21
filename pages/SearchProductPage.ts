import { Page, Locator } from "@playwright/test";
export class SearchProductPage {
  private readonly page: Page;
  private readonly txtSearchInput: Locator;
  private readonly btnSearch: Locator;
  private readonly btnAddToCart: Locator;
  private readonly successMessage: Locator;
  private readonly productsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtSearchInput = this.page.locator("input[name='search']");
    this.btnSearch = this.page.locator(".fa.fa-search");
    this.productsList = this.page.locator(".product-thumb h4 a");
    this.btnAddToCart = this.page.getByRole("button", {
      name: "Add to Cart",
      exact: true,
    });
    this.successMessage = this.page.locator(".alert-success");
  }

  async searchProduct(product: string): Promise<void> {
    await this.txtSearchInput.fill(product);
    await this.btnSearch.click();
  }

  async openProduct(productName: string): Promise<void> {
    const products = await this.productsList.all();
    for (const product of products) {
      if (
        (await product.innerText()).trim().toLowerCase() ===
        productName.toLowerCase()
      ) {
        await product.click();
        break;
      }
    }
  }

  async addProductToCart(): Promise<void> {
    await this.btnAddToCart.click();
  }

  async getAddToCartMessage(): Promise<string> {
    const msg = (await this.successMessage.textContent())?.trim() ?? "";
    return msg;
  }
}
