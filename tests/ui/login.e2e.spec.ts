import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../../src/pages/index';

test.describe('Login page:', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    });

    test('should show error when email, password is empty', async ({ page }) => {
        await loginPage.login('', '', test.info().workerIndex);
        await expect(loginPage.errorEnterEmail).toBeVisible();
        await expect(loginPage.errorEnterEmail).toHaveText('Email is required');
        await expect(loginPage.errorEnterPassword).toBeVisible();
        await expect(loginPage.errorEnterPassword).toHaveText('Password is required');
        await page.screenshot({ path: 'tests/screenshots/login-error-empty-email-password.jpeg', fullPage: true });
        await page.locator('form').screenshot({ path: 'tests/screenshots/login-error-empty-email-password-form.jpeg' });
    });

    test('should show error when invalid email', async () => {
        await loginPage.login('bad-email@try.me', process.env.PASSWORD as string, test.info().workerIndex);
        await expect(loginPage.errorInvalidUsernameOrPassword).toBeVisible();
        await expect(loginPage.errorInvalidUsernameOrPassword).toHaveText('Invalid username or password');
    });

    test('should show error when invalid password', async () => {
        await loginPage.login(process.env.EMAIL as string, 'bad-password', test.info().workerIndex);
        await expect(loginPage.errorInvalidUsernameOrPassword).toBeVisible();
        await expect(loginPage.errorInvalidUsernameOrPassword).toHaveText('Invalid username or password');
    });

    test('should help with forgotten password', async () => {
        await loginPage.clickSignInButton();
        await expect(loginPage.pageHeader).toBeVisible();
        await expect(loginPage.pageHeader).toHaveText('Вхід до системи');
        await loginPage.linkForgotPassword.click();
    });

    test('should redirect to "register" page', async () => {
        await loginPage.clickSignInButton();
        await expect(loginPage.pageHeader).toBeVisible();
        await expect(loginPage.pageHeader).toHaveText('Вхід до системи');
        await loginPage.clickRegister();
        await expect(loginPage.pageHeader).toBeVisible();
        await expect(loginPage.pageHeader).toHaveText('Реєстрація');
    });
});
