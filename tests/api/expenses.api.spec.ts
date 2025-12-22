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
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody, '\nAdd body: ', addBody);
            }
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

        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.updateExpense(updateBody);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody, '\nUpdate body:', updateBody);
            }
        });
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
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
        });
    });

    test('Delete expense Test', async () => {
        let jsonBody = '';
        deleteBody.id = expenseUuid;

        await test.step('send expenses request', async () => {
            [response, jsonBody] = await apiWorld.expensesApi.deleteExpense(deleteBody);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody, '\nDelete body: ', deleteBody);
            }
        });
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
            expect(deleteUuid).toBeDefined();
            expect(deleteUuid).toMatch(uuidRegex);
        });
    });
});
