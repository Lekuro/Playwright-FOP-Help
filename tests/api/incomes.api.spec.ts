import { test, expect } from '@playwright/test';
import { apiWorld } from '../../src/hooks/api-global-setup';
import { IIncomesResponseDto } from 'src/models/api-models/index.dto';

test.describe('Incomes API Tests', () => {
    let response: Response;
    const addIncomeBody = {
        date: '2025-12-15',
        income: '15000.00',
        currency: 'USD',
        comment: 'Consulting services',
        cash: false
    };
    let incomeUuid: string;
    let updateUuid: string;
    const deleteIncomeBody = {
        id: '',
        income: '',
        date: '',
        currency: '',
        cash: false
    };
    test('Add income Test', async () => {
        let jsonBody: string;

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.addIncome(addIncomeBody);
            // console.log('💰 addIncome response:', response, '\nResponse Body:', jsonBody);
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
            const uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
            expect(incomeUuid).toMatch(uuidRegex);
        });
    });

    test('Update income Test', async () => {
        let jsonBody: string;
        const updateIncomeBody = {
            id: incomeUuid,
            ...addIncomeBody
        };
        updateIncomeBody.comment = 'Updated consulting services';
        updateIncomeBody.income = '17500.00';
        // console.log('📝 Update Income Body:', updateIncomeBody);

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.updateIncome(updateIncomeBody);
            // console.log('💰 updateIncome response:', response, '\nResponse Body:', jsonBody);
        });
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
            const uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
            expect(updateUuid).toMatch(uuidRegex);
        });
    });

    test('Get all incomes Test', async () => {
        let jsonBody: IIncomesResponseDto;
        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.getIncomes();
            // console.log('💰 getIncomes response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('🧾 Total Incomes Retrieved:', jsonBody.length);
            expect(jsonBody.length).toBeGreaterThan(2);
        });
    });

    test('Delete incomeUuid Test', async () => {
        let jsonBody: string;
        deleteIncomeBody.id = incomeUuid;
        // console.log('📝 Delete incomeUuid Body:', deleteIncomeBody);

        await test.step('send incomes request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.deleteIncome(deleteIncomeBody);
            // console.log('💰 deleteIncome response:', response, '\nResponse Body:', jsonBody);
        });
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
            // console.log('🆔 Deleted Income UUID:', deleteUuid);
            expect(deleteUuid).toBeDefined();
            const uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
            expect(deleteUuid).toMatch(uuidRegex);
        });
    });
});
