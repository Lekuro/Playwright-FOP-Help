import { test, expect } from '@playwright/test';
import { apiWorld, uuidRegex } from '../../src/hooks/api-global-setup';
import { ITaxItemDto } from 'src/models/api-models/index.dto';

test.describe('Taxes API Tests', () => {
    let response: Response;
    let taxIdToPay: string;
    let payedUuid: string;
    // const removeBody = {
    //     id: '',
    //     date: '',
    //     incomes: 0,
    //     expenses: 0,
    //     flatTax: 0,
    //     ssp: 0,
    //     vat: 0,
    //     militaryTax: 0,
    //     payed: false,
    //     comment: ''
    // };

    test('Get all Taxes Test', async () => {
        let jsonBody: ITaxItemDto[];
        await test.step('send taxes request', async () => {
            [response, jsonBody] = await apiWorld.taxesApi.getTaxes();
            // console.log('🧾 getTaxes response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('🧾 Total Incomes Retrieved:', jsonBody.length);
        });
    });

    test('Get Payed Taxes Test', async () => {
        let jsonBody: ITaxItemDto[];
        await test.step('send taxes request', async () => {
            [response, jsonBody] = await apiWorld.taxesApi.getPayedTaxes();
            // console.log('🧾 getPayedTaxes response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('🧾 Total Incomes Retrieved:', jsonBody.length);
        });
    });

    test('Get Pending Taxes Test', async () => {
        let jsonBody: ITaxItemDto[];
        await test.step('send taxes request', async () => {
            [response, jsonBody] = await apiWorld.taxesApi.getPendingTaxes();
            // console.log('🧾 getPendingTaxes response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body exists', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('🧾 Total Incomes Retrieved:', jsonBody.length);
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody[0]).toHaveProperty('id');
            expect(jsonBody[0]).toHaveProperty('userId');
            expect(jsonBody[0]).toHaveProperty('sumIncomes');
            expect(jsonBody[0]).toHaveProperty('sumExpenses');
            expect(jsonBody[0]).toHaveProperty('amountEP');
            expect(jsonBody[0]).toHaveProperty('amountPDV');
            expect(jsonBody[0]).toHaveProperty('amountESV');
            expect(jsonBody[0]).toHaveProperty('dtFrom');
            expect(jsonBody[0]).toHaveProperty('dtTo');
            expect(jsonBody[0]).toHaveProperty('comment');
            expect(jsonBody[0]).toHaveProperty('taxPayed', false);
            expect(jsonBody[0]).toHaveProperty('amountMilitaryTax');
        });
        await test.step('verify uuid of tax calculation', () => {
            taxIdToPay = jsonBody[0].id;
            expect(taxIdToPay).toMatch(uuidRegex);
        });
    });

    test('Pay Tax Test', async () => {
        let jsonBody: string;
        await test.step('send taxes request', async () => {
            [response, jsonBody] = await apiWorld.taxesApi.payTaxes({ id: taxIdToPay });
            // console.log('🧾 payTaxes response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully payed tax with ID: ');
        });
        await test.step('verify uuid of updated income', () => {
            payedUuid = jsonBody.split(': ')[1].replace('"', '');
            expect(payedUuid).toBeDefined();
            expect(payedUuid).toMatch(uuidRegex);
        });
    });

    // test('Remove Tax Test', async () => {
    //     // dont works
    //     let jsonBody: string;
    //     removeBody.id = payedUuid;
    //     await test.step('send taxes request', async () => {
    //         [response, jsonBody] = await apiWorld.taxesApi.removeTax(removeBody);
    //         console.log('🧾 removeTax response:', response, '\nResponse Body:', jsonBody);
    //     });
    //     await test.step('verify response status', () => {
    //         expect(response.status).toBe(200);
    //         expect(response.statusText).toBe('OK');
    //         expect(response.ok).toBeTruthy();
    //     });
    //     await test.step('verify response body', () => {
    //         expect(jsonBody).toBeDefined();
    //         expect(jsonBody).toContain('Successfully payed tax with ID: ');
    //     });
    //     await test.step('verify uuid of updated income', () => {
    //         const removedUuid = jsonBody.split(': ')[1].replace('"', '');
    //         expect(removedUuid).toBeDefined();
    //         expect(removedUuid).toMatch(uuidRegex);
    //     });
    // });
});
