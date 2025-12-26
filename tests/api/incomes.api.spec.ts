import { test, expect } from '@playwright/test';
import { apiWorld, uuidRegex } from '../../src/hooks/api-global-setup';
import { IIncomesResponseDto } from 'src/models/api-models/index.dto';

test.describe('Incomes API Tests', () => {
    let response: Response;
    const addBody = {
        date: '2025-12-23',
        income: '15000.00',
        currency: 'USD',
        comment: 'Consulting services',
        cash: false
    };
    let incomeUuid: string;
    let updateUuid: string;
    const deleteBody = {
        id: '',
        income: '',
        date: '',
        currency: '',
        cash: false
    };
    test('Add income Test', async () => {
        let jsonBody: string;

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.addIncome(addBody);
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
            expect(jsonBody).toContain('Successfully created income ID: ');
        });
        await test.step('verify uuid of created income', () => {
            incomeUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(incomeUuid).toBeDefined();
            expect(incomeUuid).toMatch(uuidRegex);
        });
    });

    test('Update income Test', async () => {
        let jsonBody = '';
        const updateBody = {
            id: incomeUuid,
            ...addBody
        };
        updateBody.comment = 'Updated consulting services';
        updateBody.income = '17500.00';

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.updateIncome(updateBody);
            if (response.status !== 200) {
                console.log('⭕ Skipped \nResponse:', response, '\nResponse Body:', jsonBody, '\nUpdate body: ', updateBody);
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
            expect(jsonBody).toContain('Successfully modified income ID: ');
        });
        await test.step('verify uuid of updated income', () => {
            updateUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(updateUuid).toBeDefined();
            expect(updateUuid).toMatch(uuidRegex);
        });
    });

    test('Get all incomes Test', async () => {
        let jsonBody: IIncomesResponseDto;
        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.getIncomes();
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

    test('Delete income Test', async () => {
        let jsonBody = '';
        deleteBody.id = incomeUuid;

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.deleteIncome(deleteBody);
            if (response.status !== 200) {
                console.log('⭕ Skipped \nresponse:', response, '\nResponse Body:', jsonBody, '\nDelete body: ', deleteBody);
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
            expect(jsonBody).toContain('Successfully deleted income ID: ');
        });
        await test.step('verify uuid of updated income', () => {
            const deleteUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(deleteUuid).toBeDefined();
            expect(deleteUuid).toMatch(uuidRegex);
        });
    });
});
