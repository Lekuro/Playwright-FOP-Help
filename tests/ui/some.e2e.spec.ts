import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';

test.describe('fixture-based test example', { tag: ['@fixture'] }, () => {
    test('has title', async ({ loggedHomePage }) => {
        await loggedHomePage.goTo();
        await loggedHomePage.thisPage.title();

        const isLogged = await loggedHomePage.isLoggedIn();
        await loggedHomePage.thisPage.waitForTimeout(5000);
        expect(isLogged).toBeTruthy();
    });
});
