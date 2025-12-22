import { test, expect } from '@playwright/test';
import { apiWorld } from '../../src/hooks/api-global-setup';
import { ILoginResponseDto } from 'src/models/api-models/index.dto';

test.describe('Login API Tests', () => {
    const credentials = {
        username: apiWorld.configService.config.auth.uiEmail,
        password: apiWorld.configService.config.auth.password
    };

    const wrongCredentials = {
        username: 'wrong@example.com',
        password: 'wrongpassword'
    };
    let response: Response;

    test('Successful Login Test', async () => {
        let jsonBody: ILoginResponseDto;
        await test.step('send login request', async () => {
            [response, jsonBody] = await apiWorld.loginApi.login(credentials);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status and body', () => {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.ok).toBeTruthy();
            expect(jsonBody).toHaveProperty('token');
            expect(jsonBody).toHaveProperty('expiration');
            expect(jsonBody).toHaveProperty('refreshToken');
            // console.log('Received Cookies:', response.headers.get('set-cookie'));
        });
        await test.step('verify cookies', () => {
            const setCookieHeader = response.headers.get('set-cookie');
            // console.log('🍪 Set-Cookie Header:', setCookieHeader);
            expect(setCookieHeader).toBeTruthy();
            expect(setCookieHeader).toContain('X-Access-Token');
            expect(setCookieHeader).toContain('X-Username');
            expect(setCookieHeader).toContain('X-Refresh-Token');
            expect(setCookieHeader).toContain('httponly');
            expect(setCookieHeader).toContain('samesite=strict');
        });
    });

    test('Failed Login Test', async () => {
        let jsonBody: ILoginResponseDto;
        await test.step('send login request', async () => {
            [response, jsonBody] = await apiWorld.loginApi.login(wrongCredentials);
            if (response.status !== 200) {
                console.log('response:', response, '\nResponse Body:', jsonBody);
            }
        });
        await test.step('verify response status and body', () => {
            expect(response.status).toBe(401);
            expect(response.statusText).toBe('Unauthorized');
            expect(response.ok).toBe(false);
            expect(jsonBody).toHaveProperty('title', 'Unauthorized');
        });
        await test.step('verify cookies', () => {
            const setCookieHeader = response.headers.get('set-cookie');
            expect(setCookieHeader).toBeNull();
        });
    });
});
