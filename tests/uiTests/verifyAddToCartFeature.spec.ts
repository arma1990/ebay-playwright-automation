import test, { expect } from "@playwright/test";
import AddToCartPage from "../../pages/cart.page.ts";
import HomePage from "../../pages/home.page.ts";

let homePage: HomePage;

test.describe('UI scenario to validate cart item count', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
    })
    
    /**
     * Test Case: Verify item can be added to Cart
     * Related Jira Story/URL: NA
     * Feature Type: UI
     * Author: Arman Khandelwal
     * Creation Date: 6th Jan 2025
    */
    test('Verify item can be added to Cart', async ({ page }) => {
        await test.step('1. Open browser and 2. Navigate to ebay website', async () => {
            await page.goto('https://www.ebay.com');
        });
        
        await test.step(`3. Search for 'book'`, async () => {
            await homePage.searchForItem('book');
        });
    
        const iteamTab = await test.step('4. Click on the first book in the list', async () => {
            return await homePage.clickFirstItem();
        });
    
        const newPage = iteamTab; // newPage is the newly opened tab
        const addToCartPageOnNewTab = new AddToCartPage(newPage);
    
        await test.step(`5. In the item listing page, click on "Add to cart"`, async () => {
            await addToCartPageOnNewTab.addToCart();  // Perform the action on the new tab
        });
    
        await test.step('6. Verify the cart has been updated and displays the number of items in the cart', async () => {
            const itemCount = await addToCartPageOnNewTab.getCartItemCount();
            expect(itemCount).toContain('1');
        });
    });
});
