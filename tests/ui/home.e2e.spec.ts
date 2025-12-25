import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
import { screenshotPath } from '../../src/hooks/api-global-setup';

test.describe('Home page tests', { tag: ['@logged-home'] }, () => {
    // test('has title', async ({ loggedHomePage }) => {
    //     const isLogged = await loggedHomePage.isLoggedIn();
    //     // await loggedHomePage.page.waitForTimeout(1000);
    //     expect(isLogged).toBeTruthy();
    // });

    test('Toggle theme test', async ({ loggedHomePage }) => {
        const lightTheme = 'Переключити на темну тему';
        const darkTheme = 'Переключити на світлу тему';

        await test.step('verify initial theme', async () => {
            const themeState = await loggedHomePage.header.getThemeState();
            expect(themeState).toBe(lightTheme);
            await loggedHomePage.page.screenshot({ path: `${screenshotPath}initial-theme.jpeg` });
        });
        await test.step('toggle theme', async () => {
            await loggedHomePage.header.clickToggleTheme();
        });
        await test.step('verify changed theme', async () => {
            const themeState = await loggedHomePage.header.getThemeState();
            expect(themeState).toBe(darkTheme);
            await loggedHomePage.page.screenshot({ path: `${screenshotPath}changed-theme.jpeg` });
        });
        await test.step('toggle theme', async () => {
            await loggedHomePage.header.clickToggleTheme();
        });
        await test.step('verify returned theme', async () => {
            const themeState = await loggedHomePage.header.getThemeState();
            expect(themeState).toBe(lightTheme);
            await loggedHomePage.page.screenshot({ path: `${screenshotPath}returned-theme.jpeg` });
        });
    });

    // test('Navigate to incomes page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to incomes', async () => {
    //         await loggedHomePage.navigateMenu.clickIncomes();
    //     });
    //     await test.step('verify url on incomes page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/incomes/);
    //     });
    //     await test.step('verify title of incomes page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Прибутки');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-incomes.jpeg` });
    //     });
    //     await test.step('navigate to home', async () => {
    //         await loggedHomePage.header.clickHomePage();
    //     });
    //     await test.step('verify url on home page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL('https://new.fophelp.pro/');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-home-back.jpeg` });
    //     });
    // });

    // test('Navigate to expenses page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to expenses', async () => {
    //         await loggedHomePage.navigateMenu.clickExpenses();
    //     });
    //     await test.step('verify url on expenses page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/expenses/);
    //     });
    //     await test.step('verify title of expenses page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Витрати');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-expenses.jpeg` });
    //     });
    // });

    // test('Navigate to all taxes page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to all taxes', async () => {
    //         await loggedHomePage.navigateMenu.clickTaxes();
    //     });
    //     await test.step('verify url on all taxes page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/taxes\/all/);
    //     });
    //     await test.step('verify title of all taxes page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Податки');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-taxes-all.jpeg` });
    //     });
    // });

    // test('Navigate to pending taxes page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to pending taxes', async () => {
    //         await loggedHomePage.navigateMenu.hoverTaxes();
    //         await loggedHomePage.navigateMenu.clickTaxesPending();
    //     });
    //     await test.step('verify url on pending taxes page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/taxes\/pending/);
    //     });
    //     await test.step('verify title of all taxes page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Податки');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-taxes-pending.jpeg` });
    //     });
    // });

    // test('Navigate to paid taxes page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to paid taxes', async () => {
    //         await loggedHomePage.navigateMenu.hoverTaxes();
    //         await loggedHomePage.navigateMenu.clickTaxesPaid();
    //     });
    //     await test.step('verify url on paid taxes page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/taxes\/paid/);
    //     });
    //     await test.step('verify title of all taxes page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Податки');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-taxes-paid.jpeg` });
    //     });
    // });

    // test('Navigate to all reports page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to all reports', async () => {
    //         await loggedHomePage.navigateMenu.clickReports();
    //     });
    //     await test.step('verify url on all reports page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/reports\/all/);
    //     });
    //     await test.step('verify title of all reports page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Звіти');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-reports-all.jpeg` });
    //     });
    // });

    // test('Navigate to current reports page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to current reports', async () => {
    //         await loggedHomePage.navigateMenu.hoverReports();
    //         await loggedHomePage.navigateMenu.clickReportsCurrent();
    //     });
    //     await test.step('verify url on current reports page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/reports\/current/);
    //     });
    //     await test.step('verify title of all reports page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Звіти');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-reports-current.jpeg` });
    //     });
    // });

    // test('Navigate to submitted reports page', async ({ loggedHomePage }) => {
    //     await test.step('navigate to submitted reports', async () => {
    //         await loggedHomePage.navigateMenu.hoverReports();
    //         await loggedHomePage.navigateMenu.clickReportsSubmitted();
    //     });
    //     await test.step('verify url on submitted reports page', async () => {
    //         await expect(loggedHomePage.page).toHaveURL(/.*\/reports\/submitted/);
    //     });
    //     await test.step('verify title of all reports page', async () => {
    //         const pageName = await loggedHomePage.header.getPageName();
    //         expect(pageName).toBe('Звіти');
    //         await loggedHomePage.page.screenshot({ path: `${screenshotPath}navigate-reports-submitted.jpeg` });
    //     });
    // });
});
