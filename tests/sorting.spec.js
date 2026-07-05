import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Product Sorting', () => {

    test.beforeEach(async ({ page }) => {

        // Open website
        await page.goto('https://www.saucedemo.com/');

        // Login
        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('#login-button');

        // Verify login
        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_SORT_001 - Verify Name (A to Z) Sorting', async ({ page }) => {

        await page.selectOption('.product_sort_container', 'az');

        const names = await page.locator('.inventory_item_name').allTextContents();

        const sortedNames = [...names].sort();

        expect(names).toEqual(sortedNames);

    });

    test('SIT_SORT_002 - Verify Name (Z to A) Sorting', async ({ page }) => {

        await page.selectOption('.product_sort_container', 'za');

        const names = await page.locator('.inventory_item_name').allTextContents();

        const sortedNames = [...names].sort().reverse();

        expect(names).toEqual(sortedNames);

    });

    test('SIT_SORT_003 - Verify Price (Low to High)', async ({ page }) => {

        await page.selectOption('.product_sort_container', 'lohi');

        const prices = await page.locator('.inventory_item_price').allTextContents();

        const actualPrices = prices.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);

    });

    test('SIT_SORT_004 - Verify Price (High to Low)', async ({ page }) => {

        await page.selectOption('.product_sort_container', 'hilo');

        const prices = await page.locator('.inventory_item_price').allTextContents();

        const actualPrices = prices.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);

    });

    test('SIT_SORT_005 - Verify Sorting Dropdown is Visible', async ({ page }) => {

        await expect(page.locator('.product_sort_container')).toBeVisible();

    });

    test('SIT_SORT_006 - Verify Default Sorting is Name (A to Z)', async ({ page }) => {

        await expect(page.locator('.product_sort_container'))
            .toHaveValue('az');

    });

    test('SIT_SORT_007 - Verify User Can Change Sorting Multiple Times', async ({ page }) => {

        await page.selectOption('.product_sort_container', 'za');
        await expect(page.locator('.product_sort_container')).toHaveValue('za');

        await page.selectOption('.product_sort_container', 'lohi');
        await expect(page.locator('.product_sort_container')).toHaveValue('lohi');

        await page.selectOption('.product_sort_container', 'hilo');
        await expect(page.locator('.product_sort_container')).toHaveValue('hilo');

        await page.selectOption('.product_sort_container', 'az');
        await expect(page.locator('.product_sort_container')).toHaveValue('az');

    });

    test('SIT_SORT_008 - Verify Product Count Remains Same After Sorting', async ({ page }) => {

        const beforeSorting =
            await page.locator('.inventory_item').count();

        await page.selectOption('.product_sort_container', 'hilo');

        const afterSorting =
            await page.locator('.inventory_item').count();

        expect(beforeSorting).toBe(afterSorting);

    });

});