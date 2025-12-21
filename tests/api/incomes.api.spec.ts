import { test, expect } from '@playwright/test';
import { apiWorld } from '../../src/hooks/api-global-setup';
import { IIncomesResponseDto } from 'src/models/api-models/index.dto';

test.describe('Incomes API Tests', () => {
    let response: Response;
    let jsonBody: IIncomesResponseDto;
    test('Successful Login Test', async () => {
        await test.step('send login request', async () => {
            [response, jsonBody] = await apiWorld.incomesApi.getIncomes();
            // console.log('Response: ', response.status, response.statusText, response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify response status and body', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toBeDefined();
            // console.log('Received response:', response, '\nResponse Body:', jsonBody);
        });
        await test.step('verify cookies', () => {
            // const setCookieHeader = response.headers.get('set-cookie');
            // console.log('🍪 Set-Cookie Header:', setCookieHeader);
        });
    });
});
