import { test as base, Browser } from '@playwright/test';
import { HomePage } from '../pages/index.page';
import * as fs from 'fs';
import { ConfigService } from '../services/config.service';
import { apiWorld } from '../hooks/api-global-setup';

interface AtlassianFixture {
    loggedHomePage: HomePage;
    configService: ConfigService;
    homePage: HomePage;
}

const storageState = (workerId: number): string => `.auth/storage-state-worker-${workerId}.json`;

export const test = base.extend<AtlassianFixture>({
    configService: async ({ browserName }, use) => {
        process.stderr.write(`browserName: ${browserName}\n`);
        const configService = new ConfigService();
        await use(configService);
    },
    loggedHomePage: async ({ browser, configService }, use, testInfo) => {
        // Збільшуємо таймаут для налаштування фікстури до 2 хвилин
        testInfo.setTimeout(180000);

        const workerId = test.info().workerIndex;
        await authenticateFopHelp(browser, workerId, configService);

        const context = await browser.newContext({
            storageState: storageState(workerId),
            recordVideo: {
                dir: 'test-results/videos'
            }
        });
        const setCookies = await context
            .cookies()
            .then((cookiesArray) => cookiesArray.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '));

        apiWorld.configService.config.auth.uiCookies = setCookies;
        // process.stderr.write(`🍪 Cookie from fixture: ${setCookies}\n`);
        const page = await context.newPage();
        const loggedPage = new HomePage(page, configService.config.uiConfig.loggedBaseUrl);
        await loggedPage.goTo();
        await use(loggedPage);

        // disposal
        await page.close();
        await context.close();
    },
    homePage: async ({ page, configService }, use) => {
        const homePage = new HomePage(page, configService.config.uiConfig.loginBaseUrl);
        await use(homePage);
    }
});

async function authenticateFopHelp(browser: Browser, workerId: number, configService: ConfigService): Promise<void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const homePage = new HomePage(page, configService.config.uiConfig.loginBaseUrl);

    await homePage.goTo();
    await homePage.login(configService.config.auth.uiEmail, configService.config.auth.password);

    await page.context().storageState({ path: storageState(workerId) });
    await context.close();
}
