import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('SauceDemo Login Functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('SIT_LOGIN_001 - Successful Login with Valid Credentials', async ({ page }) => {

        await page.fill('#user-name', VALID_USER);
        await page.fill('#password', VALID_PASSWORD);

        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();

    });

    test('SIT_LOGIN_002 - Invalid Password', async ({ page }) => {

        await page.fill('#user-name', VALID_USER);
        await page.fill('#password', 'wrong_password');

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');

    });

    test('SIT_LOGIN_003 - Invalid Username', async ({ page }) => {

        await page.fill('#user-name', 'wrong_user');
        await page.fill('#password', VALID_PASSWORD);

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();

    });

    test('SIT_LOGIN_004 - Invalid Username and Password', async ({ page }) => {

        await page.fill('#user-name', 'wrong_user');
        await page.fill('#password', 'wrong_password');

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]')).toBeVisible();

    });

    test('SIT_LOGIN_005 - Blank Username', async ({ page }) => {

        await page.fill('#password', VALID_PASSWORD);

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');

    });

    test('SIT_LOGIN_006 - Blank Password', async ({ page }) => {

        await page.fill('#user-name', VALID_USER);

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Password is required');

    });

    test('SIT_LOGIN_007 - Both Username and Password Blank', async ({ page }) => {

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');

    });

    test('SIT_LOGIN_008 - Locked Out User', async ({ page }) => {

        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', VALID_PASSWORD);

        await page.click('#login-button');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Sorry, this user has been locked out.');

    });

    test('SIT_LOGIN_009 - Login Using Enter Key', async ({ page }) => {

        await page.fill('#user-name', VALID_USER);
        await page.fill('#password', VALID_PASSWORD);

        await page.press('#password', 'Enter');

        await expect(page).toHaveURL(/inventory.html/);

    });

    test('SIT_LOGIN_010 - Verify Password Field is Masked', async ({ page }) => {

        await expect(page.locator('#password'))
            .toHaveAttribute('type', 'password');

    });

    test('SIT_LOGIN_011 - Verify Login Button is Visible', async ({ page }) => {

        await expect(page.locator('#login-button')).toBeVisible();

    });

    test('SIT_LOGIN_012 - Verify Login Page Title', async ({ page }) => {

        await expect(page).toHaveTitle('Swag Labs');

    });

});