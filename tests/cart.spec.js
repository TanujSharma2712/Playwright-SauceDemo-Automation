import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Cart Functionality', () => {

    test.beforeEach(async ({ page }) => {

        // Open website
        await page.goto('https://www.saucedemo.com/');

        // Login
        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('#login-button');

        // Verify successful login
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('SIT_CART_001 - Add a single product to cart', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    });

    test('SIT_CART_002 - Add multiple products to cart', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bike-light');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    });

    test('SIT_CART_003 - Remove product from inventory page', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.click('#remove-sauce-labs-backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

    });

    test('SIT_CART_004 - Open cart after adding product', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await page.click('.shopping_cart_link');

        await expect(page).toHaveURL(/cart.html/);

        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');

    });

    test('SIT_CART_005 - Remove product from cart page', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await page.click('.shopping_cart_link');

        await page.click('#remove-sauce-labs-backpack');

        await expect(page.locator('.cart_item')).toHaveCount(0);

    });

    test('SIT_CART_006 - Continue shopping from cart', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await page.click('.shopping_cart_link');

        await page.click('#continue-shopping');

        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_CART_007 - Verify cart badge updates correctly', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.click('#add-to-cart-sauce-labs-bike-light');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        await page.click('#remove-sauce-labs-backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    });

    test('SIT_CART_008 - Verify multiple products appear inside cart', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bike-light');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

        await page.click('.shopping_cart_link');

        await expect(page.locator('.cart_item')).toHaveCount(3);

    });

    test('SIT_CART_009 - Verify Add to Cart button changes to Remove', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await expect(page.locator('#remove-sauce-labs-backpack'))
            .toBeVisible();

    });

    test('SIT_CART_010 - Verify product remains in cart after navigating to cart page', async ({ page }) => {

        await page.click('#add-to-cart-sauce-labs-backpack');

        await page.click('.shopping_cart_link');

        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');

    });

});