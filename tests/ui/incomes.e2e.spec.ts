import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
import { screenshotPath } from '../../src/hooks/api-global-setup';
import { faker } from '@faker-js/faker';

test.describe('Incomes page tests', { tag: ['@incomes'] }, () => {
    const addAmount = '150';
    const addComment = 'Add income comment';
    const modifyAmount = '500';
    const modifyComment = 'Modify income comment';
    test('Add income test', async ({ incomesPage }) => {
        await test.step('Click Add Income button', async () => {
            await incomesPage.clickAddIncome();
        });
        await test.step('Fill income form', async () => {
            await incomesPage.addIncomeModal.fillAmount(addAmount);
            await incomesPage.addIncomeModal.fillComment(addComment);
            await incomesPage.page.screenshot({ path: `${screenshotPath}add-income-filled.jpeg` });
        });
        await test.step('Submit income form', async () => {
            await incomesPage.addIncomeModal.clickSubmit();
            // await incomesPage.page.screenshot({ path: `${screenshotPath}add-income-submitted.jpeg` });
        });

        await test.step('Verify successful message', async () => {
            await expect(incomesPage.addIncomeModal.isSuccessMessage()).toBeTruthy();
            await incomesPage.page.screenshot({ path: `${screenshotPath}add-income-message.jpeg` });
        });
        await test.step('Verify income added', async () => {
            const amountObtained = await incomesPage.getIncomeRow(0).getAmount();
            expect(amountObtained).toContain(addAmount);
            const commentObtained = await incomesPage.getIncomeRow(0).getComment();
            expect(commentObtained).toBe(addComment);
            await incomesPage.page.screenshot({ path: `${screenshotPath}income-added-verified.jpeg` });
        });
    });

    test('Modify income test', async ({ incomesPage }) => {
        await test.step('Click Modify Income button', async () => {
            await incomesPage.getIncomeRow(0).clickModify();
        });
        await test.step('Fill income form', async () => {
            // const today = new Date();
            // const formattedDate = today.toISOString().split('T')[0];
            const formattedDate = faker.date.past().toISOString().split('T')[0];
            await incomesPage.addIncomeModal.fillDate(formattedDate);
            await incomesPage.addIncomeModal.fillCurrency('USD');
            await incomesPage.addIncomeModal.fillAmount(modifyAmount);
            await incomesPage.addIncomeModal.changeIsCashCheckbox();
            // await incomesPage.addIncomeModal.changeIsWithoutIncomeCheckbox();//take away amount
            await incomesPage.addIncomeModal.fillComment(modifyComment);
            await incomesPage.page.screenshot({ path: `${screenshotPath}modify-income-filled.jpeg` });
        });
        await test.step('Submit income form', async () => {
            await incomesPage.addIncomeModal.clickSubmit();
            // await incomesPage.page.screenshot({ path: `${screenshotPath}modify-income-submitted.jpeg` });
        });

        await test.step('Verify successful message', async () => {
            await expect(incomesPage.addIncomeModal.isSuccessMessage()).toBeTruthy();
            await incomesPage.page.screenshot({ path: `${screenshotPath}modify-income-message.jpeg` });
        });
        await test.step('Verify income added', async () => {
            const amountObtained = await incomesPage.getIncomeRow(0).getAmount();
            expect(amountObtained).toContain(modifyAmount);
            const commentObtained = await incomesPage.getIncomeRow(0).getComment();
            test.fail(true, 'Known issue: Comment is not updated after modifying income');
            expect(commentObtained).toBe(modifyComment);
            await incomesPage.page.screenshot({ path: `${screenshotPath}income-modified-verified.jpeg` });
        });
    });

    test('Delete income test', async ({ incomesPage }) => {
        let amountOfIncomesBefore: number;
        let amountOfIncomesAfter: number;
        let dialogMessage: string;
        let dialogType: string;

        incomesPage.page.on('dialog', async (dialog) => {
            dialogMessage = dialog.message();
            dialogType = dialog.type();
            console.log(`Dialog type: ${dialogType}, message: ${dialogMessage}`);
            expect(dialogMessage).toContain('Ви впевнені, що хочете видалити цей запис?');

            await dialog.accept(); // or dialog.dismiss()
        });

        await test.step('verify amount of rows before deletion', async () => {
            amountOfIncomesBefore = await incomesPage.countRows();
        });

        await test.step('Click delete Income button', async () => {
            await incomesPage.getIncomeRow(0).clickDelete();
            await incomesPage.page.screenshot({ path: `${screenshotPath}delete-income-dialog.jpeg` });
        });

        await test.step('verify amount of rows after deletion', async () => {
            amountOfIncomesAfter = await incomesPage.countRows();
            console.log(`Rows after deletion: ${amountOfIncomesAfter}`);
        });

        await test.step('Compare amounts of rows before and after deletion', () => {
            expect(amountOfIncomesAfter).toBeLessThan(amountOfIncomesBefore);
        });
        await test.step('Verify dialog was shown', () => {
            expect(dialogMessage).toBeDefined();
            expect(dialogType).toBe('confirm'); // or 'alert'
        });
    });
});
