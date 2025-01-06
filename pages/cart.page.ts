import { Locator, Page } from '@playwright/test'

class AddToCartPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly cartItemCount: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-testid="ux-call-to-action"]:has-text("Add to cart")');
        this.cartItemCount = page.locator('i#gh-cart-n');
    }

    // Function to add cart
    async addToCart() {
        await this.addToCartButton.click();
    }

    // Function to Get Cart Item Count
    async getCartItemCount() {
        const itemCount = await this.cartItemCount.innerText();
        return itemCount.trim();  // Returns the number of items in the cart
    }
}

export default AddToCartPage;