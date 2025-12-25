// import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
// import { apiWorld } from '../../src/hooks/api-global-setup';

test.describe('Incomes page tests', { tag: ['@incomes'] }, () => {
    test('Add income test', async ({ incomesPage }) => {
        const testComment = 'Add income comment';

        await test.step('Click Add Income button', async () => {
            await incomesPage.clickAddIncome();
        });
        await test.step('Fill income form', async () => {
            await incomesPage.addIncomeModal.fillAmount('1500');
            await incomesPage.addIncomeModal.fillComment(testComment);
            await incomesPage.page.screenshot({ path: 'test-results/screenshots/fill-income-form.jpeg' });
        });
        await test.step('Submit income form', async () => {
            await incomesPage.addIncomeModal.clickSubmit();
            await incomesPage.page.screenshot({ path: 'test-results/screenshots/submit-income-form.jpeg' });
        });
        await test.step('Verify income added', async () => {
            await incomesPage.page.waitForTimeout(5000);
        });
    });
});
