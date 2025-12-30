import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
import { screenshotPath } from '../../src/hooks/api-global-setup';
import 'dotenv/config';

test.describe('Login page tests', () => {
    test('should show error when email, password is empty', async ({ homePage }) => {
        await homePage.quickLogin('', '');
        await expect(homePage.loginModal.errorEnterEmail).toBeVisible();
        await expect(homePage.loginModal.errorEnterEmail).toHaveText('Email is required');
        await expect(homePage.loginModal.errorEnterPassword).toBeVisible();
        await expect(homePage.loginModal.errorEnterPassword).toHaveText('Password is required');
        await homePage.page.screenshot({ path: `${screenshotPath}/login-error-empty-email-password-full.jpeg`, fullPage: true });
        await homePage.page.screenshot({ path: `${screenshotPath}/login-error-empty-email-password.jpeg` });
        await homePage.page.locator('form').screenshot({ path: `${screenshotPath}/login-error-empty-email-password-form.jpeg` });
    });

    test('should show error when invalid email', async ({ homePage }) => {
        await homePage.quickLogin('bad-email@try.me', process.env.FOP_HELP_PASSWORD as string);
        await expect(homePage.loginModal.errorInvalidUsernameOrPassword).toBeVisible();
        await expect(homePage.loginModal.errorInvalidUsernameOrPassword).toHaveText('Invalid username or password');
        await homePage.page.screenshot({ path: `${screenshotPath}/login-error-invalid-email.jpeg` });
    });

    test('should show error when invalid password', async ({ homePage }) => {
        await homePage.quickLogin(process.env.FOP_HELP_UI_EMAIL as string, 'bad-password');
        await expect(homePage.loginModal.errorInvalidUsernameOrPassword).toBeVisible();
        await expect(homePage.loginModal.errorInvalidUsernameOrPassword).toHaveText('Invalid username or password');
        await homePage.page.screenshot({ path: `${screenshotPath}/login-error-invalid-password.jpeg` });
    });

    test('should help with forgotten password', async ({ homePage }) => {
        let dialogMessage = '';
        let dialogType = '';
        let dialogShown = false;

        homePage.page.on('dialog', async (dialog) => {
            dialogMessage = dialog.message();
            dialogType = dialog.type();
            dialogShown = true;
            console.log(`Dialog type: ${dialogType}, message: ${dialogMessage}`);
            expect(dialogMessage).toBe('Forgot password functionality will be implemented. Please contact support for now.');
            await dialog.accept();
        });

        await homePage.header.clickSignIn();
        await expect(homePage.loginModal.linkForgotPassword).toBeVisible();
        await expect(await homePage.loginModal.getHeader()).toBe('Вхід до системи');
        await homePage.loginModal.linkForgotPassword.click();
        expect(dialogShown).toBe(true);
        expect(dialogType).toBe('alert');
        await homePage.page.screenshot({ path: `${screenshotPath}/login-forgot-password-link.jpeg` });
    });

    test('should redirect to "register" page', async ({ homePage }) => {
        await homePage.header.clickSignIn();
        await expect(await homePage.loginModal.getHeader()).toBe('Вхід до системи');
        await homePage.loginModal.clickRegister();
        await expect(await homePage.loginModal.getHeader()).toBe('Реєстрація');
        await homePage.page.screenshot({ path: `${screenshotPath}/login-redirect-to-register-page.jpeg` });
    });
});
