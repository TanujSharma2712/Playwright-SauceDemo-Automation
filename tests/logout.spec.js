import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Logout Functionality', () => {

    test.beforeEach(async ({ page }) => {

        // Open SauceDemo
        await page.goto('https://www.saucedemo.com/');

        // Login
        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('#login-button');

        // Verify successful login
        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_LOGOUT_001 - Logout Successfully', async ({ page }) => {

        await page.click('#react-burger-menu-btn');

        await page.waitForSelector('#logout_sidebar_link');

        await page.click('#logout_sidebar_link');

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await expect(page.locator('#login-button')).toBeVisible();

    });

    test('SIT_LOGOUT_002 - Verify User is Redirected to Login Page', async ({ page }) => {

        await page.click('#react-burger-menu-btn');

        await page.waitForSelector('#logout_sidebar_link');

        await page.click('#logout_sidebar_link');

        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();

    });

    test('SIT_LOGOUT_003 - Verify Inventory Page Cannot Be Accessed After Logout', async ({ page }) => {

        await page.click('#react-burger-menu-btn');

        await page.waitForSelector('#logout_sidebar_link');

        await page.click('#logout_sidebar_link');

        // Try to access inventory page directly
        await page.goto('https://www.saucedemo.com/inventory.html');

        // User should be redirected back to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });

    test('SIT_LOGOUT_004 - Verify Login Page Elements are Visible After Logout', async ({ page }) => {

        await page.click('#react-burger-menu-btn');

        await page.waitForSelector('#logout_sidebar_link');

        await page.click('#logout_sidebar_link');

        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();

    });

    test('SIT_LOGOUT_005 - Verify User Can Login Again After Logout', async ({ page }) => {

        // Logout
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('#logout_sidebar_link');
        await page.click('#logout_sidebar_link');

        // Login again
        await page.fill('#user-name', USERNAME);
        await page.fill('#password', PASSWORD);

        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory.html/);

    });

});