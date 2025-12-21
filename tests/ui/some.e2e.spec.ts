import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';
// import { apiWorld } from '../../src/hooks/api-global-setup';

test.describe('fixture-based test example', { tag: ['@fixture'] }, () => {
    test('has title', async ({ loggedHomePage }) => {
        const isLogged = await loggedHomePage.isLoggedIn();
        await loggedHomePage.page.waitForTimeout(1000);

        expect(isLogged).toBeTruthy();
    });
});
