import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Checkout Functionality', () => {

    test.beforeEach(async ({ page }) => {

        // Open website
        await page.goto('https://www.saucedemo.com/');

        // Login
        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('#login-button');

        // Add one product
        await page.click('#add-to-cart-sauce-labs-backpack');

        // Open Cart
        await page.click('.shopping_cart_link');

        // Proceed to Checkout
        await page.click('#checkout');
    });

    test('SIT_CHECKOUT_001 - Successful Checkout', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await page.click('#finish');

        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');

    });

    test('SIT_CHECKOUT_002 - Missing First Name', async ({ page }) => {

        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('First Name is required');

    });

    test('SIT_CHECKOUT_003 - Missing Last Name', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Last Name is required');

    });

    test('SIT_CHECKOUT_004 - Missing Postal Code', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');

        await page.click('#continue');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Postal Code is required');

    });

    test('SIT_CHECKOUT_005 - All Fields Blank', async ({ page }) => {

        await page.click('#continue');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('First Name is required');

    });

    test('SIT_CHECKOUT_006 - Cancel Checkout Information', async ({ page }) => {

        await page.click('#cancel');

        await expect(page).toHaveURL(/cart.html/);

    });

    test('SIT_CHECKOUT_007 - Verify Checkout Overview Page', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await expect(page.locator('.summary_info')).toBeVisible();

        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');

    });

    test('SIT_CHECKOUT_008 - Verify Product Total is Displayed', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await expect(page.locator('.summary_subtotal_label'))
            .toBeVisible();

    });

    test('SIT_CHECKOUT_009 - Cancel Checkout from Overview Page', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        await page.click('#cancel');

        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_CHECKOUT_010 - Verify Thank You Page', async ({ page }) => {

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');
        await page.click('#finish');

        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');

        await expect(page.locator('.complete-text')).toBeVisible();

        await expect(page.locator('#back-to-products')).toBeVisible();

    });

});