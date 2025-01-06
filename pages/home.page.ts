import { Locator, Page } from "playwright/test";

class HomePage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly firstItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search for anything');
        this.searchButton = page.locator('#gh-btn');
        this.firstItem = page.locator('a.s-item__link[href*="book"]').first();
    }

    // Function to Search for an Item
    async searchForItem(item: string) {
        await this.searchBox.fill(item);
        await this.searchButton.click();
    }

    // Function to Click on First Item
    async clickFirstItem() {
        // Wait for the new tab to open after clicking the item
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page', { timeout: 60000 }), // Capture the new tab
            await this.firstItem.click(), // Click on the first item
        ]);

        await newTab.waitForLoadState(); // Wait for the new tab to load completely
        return newTab; 
    }
}

export default HomePage;