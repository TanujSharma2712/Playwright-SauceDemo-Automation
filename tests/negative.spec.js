import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Negative Test Scenarios', () => {

    test('SIT_NEG_001 - Access Inventory Without Login', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });

    test('SIT_NEG_002 - Login with Invalid Username', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', PASSWORD);

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();

    });

    test('SIT_NEG_003 - Login with Invalid Password', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', USERNAME);
        await page.fill('#password', 'wrong_password');

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();

    });

    test('SIT_NEG_004 - Checkout Without Adding Product', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);

        await page.click('#login-button');

        await page.click('.shopping_cart_link');

        await page.click('#checkout');

        await page.fill('#first-name', 'Tanuj');
        await page.fill('#last-name', 'Sharma');
        await page.fill('#postal-code', '382355');

        await page.click('#continue');

        // Finish button should still be available
        await expect(page.locator('#finish')).toBeVisible();

    });

    test('SIT_NEG_005 - Refresh Inventory Page', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);

        await page.click('#login-button');

        await page.reload();

        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_NEG_006 - Invalid URL Navigation', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/randompage');

        await expect(page.locator('body')).toBeVisible();

    });

    test('SIT_NEG_007 - Logout Then Access Inventory', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);

        await page.click('#login-button');

        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('#logout_sidebar_link');
        await page.click('#logout_sidebar_link');

        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });

    test('SIT_NEG_008 - Verify Error Message Close Button', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();

        await page.click('.error-button');

        await expect(page.locator('[data-test="error"]')).toHaveCount(0);

    });

});