import { test, expect } from '@playwright/test';

test.describe('CoinDesk API Tests', () => {
  const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  /**
   * Test Case: Verify the CoinDesk API response structure and BPI details
   * Related Jira Story/URL: NA
   * Feature Type: API
   * Author: Arman Khandelwal
   * Creation Date: 6th Jan 2025
   */
  test('Verify the CoinDesk API response structure and BPI details', async ({ request }) => {
    await test.step('Send GET request to the API', async () => {
      // Send the GET request
      const response = await request.get(apiUrl);

      // Verify the response status code
      expect(response.status()).toBe(200);
    });

    let responseData: any;
    await test.step('Parse and validate the response JSON structure', async () => {
      // Parse the response JSON
      const response = await request.get(apiUrl);
      responseData = await response.json();
      console.log(`Response Data: ${JSON.stringify(responseData, null, 4)}`);

      // Verify the response contains the expected structure
      expect(responseData).toHaveProperty('bpi');
    });

    await test.step('Validate the BPI details', async () => {
      // Extract the BPI data
      const bpi = responseData.bpi;
      console.log(`BPI Response: ${JSON.stringify(bpi, null, 4)}`);

      // Verify there are 3 BPIs: USD, GBP, EUR
      const expectedCurrencies = ['USD', 'GBP', 'EUR'];
      const actualCurrencies = Object.keys(bpi);
      expect(actualCurrencies).toEqual(expect.arrayContaining(expectedCurrencies));

      // Verify GBP description equals 'British Pound Sterling'
      expect(bpi.GBP).toHaveProperty('description', 'British Pound Sterling');
    });
  });
});
