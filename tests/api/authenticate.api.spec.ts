import { test, expect } from '@playwright/test';
import { apiWorld } from '../../src/hooks/api-global-setup';
import { IShowUserInfoResponseDto } from 'src/models/api-models/index.dto';

test.describe('Authentication API Tests', () => {
    // const credentials = {
    //     username: apiWorld.configService.config.auth.apiEmail,
    //     password: apiWorld.configService.config.auth.password
    // };

    // const wrongCredentials = {
    //     username: 'wrong@example.com',
    //     password: 'wrongpassword'
    // };
    let response: Response;

    test('Show user info data Test', async () => {
        let jsonBody: IShowUserInfoResponseDto;
        await test.step('send show user info request', async () => {
            [response, jsonBody] = await apiWorld.authenticateApi.showUserInfo();
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
        });
    });

    test('Check Admin Test', async () => {
        let isAdmin: boolean;
        await test.step('send refresh cookies request', async () => {
            [response, isAdmin] = await apiWorld.authenticateApi.checkAdmin();
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', isAdmin);
            }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(isAdmin).toBe(false);
        });
    });

    test('Check Logout Test', async () => {
        let jsonBody: IShowUserInfoResponseDto;
        await test.step('send show user info request', async () => {
            [response, jsonBody] = await apiWorld.authenticateApi.logout();
            // if (response.status !== 200) {
            console.log('response:', response, '\nResponse Body:', jsonBody);
            // }
        });
        await test.step('verify response status', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
        });
        await test.step('verify response body', () => {
            expect(jsonBody).toBeDefined();
        });
    });

    // it works but can run only logout or refresh cookies test

    // test('Refresh Cookies Test', async () => {
    //     let cookies: string | null;
    //     await test.step('send refresh cookies request', async () => {
    //         [response, cookies] = await apiWorld.authenticateApi.refreshCookies();
    //         if (response.status !== 200) {
    //             console.log('response:', response, '\nResponse Body:', cookies);
    //         }
    //     });
    //     await test.step('verify response status', () => {
    //         expect(response.status).toBe(200);
    //         expect(response.statusText).toBe('OK');
    //         expect(response.ok).toBeTruthy();
    //     });
    //     await test.step('verify response body', () => {
    //         expect(cookies).toContain('X-Access-Token=');
    //         expect(cookies).toContain('X-Username=');
    //         expect(cookies).toContain('X-Refresh-Token=');
    //         expect(cookies).toContain('X-Refresh-Expires=');
    //         expect(cookies).toContain('Session-User=');
    //         expect(cookies).toContain('httponly');
    //         expect(cookies).toContain('samesite=strict');
    //     });
    // });
});
