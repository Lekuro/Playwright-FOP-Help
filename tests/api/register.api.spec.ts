// import { test, expect } from '@playwright/test';
// import { apiWorld } from '../../src/hooks/api-global-setup';
// import { IRegisterResponseDto } from 'src/models/api-models/index.dto';
// // import { TempEmailData } from '../../src/services/temp-email.service';

// test.describe('Registration with Temp Email', () => {
//     // const tempEmailService = new TempEmailData();

//     let response: Response;
//     let jsonBody: IRegisterResponseDto;
//     let credentials: { email: string; password: string; fopVat: boolean; fopGeneral: boolean; fopGroup: number };

//     test.beforeAll('Complete registration flow with confirmation',  () => {
//         // const email = await tempEmailService.getTemporaryEmail();
//         // await tempEmailService.getCode();
//         credentials = {
//             email: 'lilolovol+3@gmail.com',
//             password: apiWorld.configService.config.auth.password,
//             fopVat: true,
//             fopGeneral: false,
//             fopGroup: 3
//         };
//     });
//     test('Successful Registration Test', async () => {
//         await test.step('send registration request', async () => {
//             [response, jsonBody] = await apiWorld.registerApi.register(credentials);
//             // console.log('Response: ', response.status, response.statusText, response, '\nResponse Body:', jsonBody);
//         });
//         await test.step('verify response status and body', () => {
//             expect(response.status).toBe(200);
//             expect(response.statusText).toBe('OK');
//             expect(response.ok).toBeTruthy();
//             expect(jsonBody).toHaveProperty('token');
//             expect(jsonBody).toHaveProperty('expiration');
//             expect(jsonBody).toHaveProperty('refreshToken');
//             // console.log('Received Cookies:', response.headers.get('set-cookie'));
//         });
//         await test.step('verify cookies', () => {
//             const setCookieHeader = response.headers.get('set-cookie');
//             // console.log('🍪 Set-Cookie Header:', setCookieHeader);
//             expect(setCookieHeader).toBeTruthy();
//             expect(setCookieHeader).toContain('X-Access-Token');
//             expect(setCookieHeader).toContain('X-Username');
//             expect(setCookieHeader).toContain('X-Refresh-Token');
//             expect(setCookieHeader).toContain('httponly');
//             expect(setCookieHeader).toContain('samesite=strict');
//         });
//     });
// });
