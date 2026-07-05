import { test, expect } from '@playwright/test';

test.describe('Intentional Failures', () => {

    test('FAIL_001 - Wrong Title', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle('Amazon');

    });

    test('FAIL_002 - Wrong URL', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveURL('https://www.google.com/');

    });

    test('FAIL_003 - Wrong Button Text', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await expect(page.locator('#login-button')).toHaveValue('Submit');

    });

});