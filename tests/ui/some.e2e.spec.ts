import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
// import { apiWorld } from '../../src/hooks/api-global-setup';

test.describe('fixture-based test example', { tag: ['@fixture'] }, () => {
    test('has title', async ({ loggedHomePage, configService, apiWorld }) => {
        const isLogged = await loggedHomePage.isLoggedIn();
        await loggedHomePage.page.waitForTimeout(3000);
        console.log('Config in test:', configService.config);
        console.log('API Cookies in config:', apiWorld.configService.config);
        console.log('Is logged in:', JSON.parse(JSON.stringify(apiWorld.configService.config)));
        expect(isLogged).toBeTruthy();
    });
});
