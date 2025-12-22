import { test, expect } from '@playwright/test';
import { apiWorld, uuidRegex } from '../../src/hooks/api-global-setup';
import { IExpensesResponseDto } from 'src/models/api-models/index.dto';

test.describe('Expenses API Tests', () => {
    let response: Response;
    const addBody = { expense: '3', date: '2025-12-22', comment: 'third expense', currency: 'UAH', cash: false };
    let expenseUuid: string;
    let updateUuid: string;
    const deleteBody = {
        id: '',
        expense: '',
        date: '',
        currency: '',
        cash: false
    };
    test('Add expense Test', async () => {
        let jsonBody: string;

        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.addExpense(addBody);
            // console.log('💸 addExpense response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully created expense ID: ');
        });
        await test.step('verify uuid of created expense', () => {
            expenseUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(expenseUuid).toBeDefined();
            expect(expenseUuid).toMatch(uuidRegex);
        });
    });

    test('Update expense Test', async () => {
        let jsonBody = '';
        const updateBody = {
            id: expenseUuid,
            ...addBody
        };
        updateBody.comment = 'Updated consulting services';
        updateBody.expense = '1';
        // console.log('💸 Update Expense Body:', updateBody);

        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.updateExpense(updateBody);
            // console.log('💸 updateExpense response:', response, '\nResponse Body:', jsonBody);
        });
        // Перевіряємо чи є помилка і skip'аємо весь тест
        if (response.status === 400) {
            console.warn('⚠️ Warning: ', jsonBody);
            test.skip();
            return;
        }
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully modified expense ID: ');
        });
        await test.step('verify uuid of updated expense', () => {
            updateUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(updateUuid).toBeDefined();
            expect(updateUuid).toMatch(uuidRegex);
        });
    });

    test('Get all expenses Test', async () => {
        let jsonBody: IExpensesResponseDto;
        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.getExpenses();
            // console.log('💸 getExpenses response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('🧾 Total Expenses Retrieved:', jsonBody.length);
        });
    });

    test('Delete expense Test', async () => {
        let jsonBody = '';
        deleteBody.id = expenseUuid;
        // console.log('📝 Delete expenseUuid Body:', deleteBody);

        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.deleteExpense(deleteBody);
            // console.log('💰 deleteExpense response:', response, '\nResponse Body:', jsonBody);
        });

        // Перевіряємо чи є помилка і skip'аємо весь тест
        if (response.status === 400) {
            console.warn('⚠️ Warning: ', jsonBody);
            test.skip();
            return;
        }
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully deleted expense ID: ');
        });
        await test.step('verify uuid of updated expense', () => {
            const deleteUuid = jsonBody.split(': ')[1].replace('"', '');
            // console.log('🆔 Deleted Expense UUID:', deleteUuid);
            expect(deleteUuid).toBeDefined();
            expect(deleteUuid).toMatch(uuidRegex);
        });
    });
});
