import { test, expect } from '@playwright/test';
import { apiWorld, uuidRegex } from '../../src/hooks/api-global-setup';
import { IDetailedResponseDto, IReportResponseDto } from 'src/models/api-models/index.dto';

test.describe('Reports API Tests', () => {
    let response: Response;
    let reportUuid: string;
    const requestBody = {
        id: '',
        date: '2025-10-01T00:00:00',
        incomes: 8908171.1,
        expenses: 17,
        ssp: 1760.0,
        flatTax: 267244.62,
        flatTaxQ: 267244.62,
        vat: 0,
        militaryTax: 8908171.1
    };

    test('Get reports Test', async () => {
        let jsonBody: IReportResponseDto[];
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.getReports();
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body ', () => {
            expect(jsonBody).toBeDefined();
            expect(Array.isArray(jsonBody)).toBe(true);
        });
    });

    test('Get pending reports Test', async () => {
        let jsonBody: IReportResponseDto[];
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.getPendingReports();
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body ', () => {
            expect(jsonBody).toBeDefined();
            expect(Array.isArray(jsonBody)).toBe(true);
        });
    });

    test('Get report details Test', async () => {
        let jsonBody: IDetailedResponseDto;
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.getReportDetails(requestBody);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body ', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toHaveProperty('date');
            expect(jsonBody).toHaveProperty('quarter');
            expect(jsonBody).toHaveProperty('data');
            expect(Array.isArray(jsonBody.data)).toBe(true);
        });
    });

    test('Save report Test', async () => {
        let jsonBody: string;
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.saveReport(requestBody);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully saved report');
        });
        await test.step('verify uuid of created report', () => {
            reportUuid = jsonBody.split('Successfully saved report ')[1].replace('"', '').trim();
            console.log('Saved report UUID:', reportUuid);
            expect(reportUuid).toBeDefined();
            expect(reportUuid).toMatch(uuidRegex);
        });
    });

    test('Get saved reports Test', async () => {
        let jsonBody: IReportResponseDto[];
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.getSavedReports();
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body ', () => {
            expect(jsonBody).toBeDefined();
            expect(Array.isArray(jsonBody)).toBe(true);
            expect(jsonBody.some((report) => report.id === reportUuid)).toBe(true);
        });
    });

    test('Remove report Test', async () => {
        let jsonBody: IDetailedResponseDto | string;
        jsonBody = '';
        const removeBody = { repID: reportUuid };
        await test.step('send reports request', async () => {
            [response, jsonBody] = await apiWorld.reportsApi.removeReport(removeBody);
            if (response.status !== 200) {
                console.log('❌ Failed \nresponse:', response, '\nResponse Body:', jsonBody);
                test.fail(true);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
            expect(jsonBody).toContain('Successfully saved report');
        });
        await test.step('verify uuid of created report', () => {
            // reportUuid = jsonBody.split('Successfully saved report ')[1].replace('"', '').trim();
            console.log('Saved report UUID:', reportUuid);
            expect(reportUuid).toBeDefined();
            expect(reportUuid).toMatch(uuidRegex);
        });
    });
});
