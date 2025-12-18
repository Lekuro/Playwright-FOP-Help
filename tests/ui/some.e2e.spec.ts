import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fop-help.fixture';

test.describe('fixture-based test example', { tag: ['@fixture'] }, () => {
    test('has title', async ({ loggedHomePage }) => {
        const isLogged = await loggedHomePage.isLoggedIn();
        
        expect(isLogged).toBeTruthy();
    });
});
