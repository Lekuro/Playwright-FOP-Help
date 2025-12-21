import { test as base, Browser } from '@playwright/test';
import { LoggedHomePage, LoginPage } from '../pages/index';
import * as fs from 'fs';
import { ConfigService } from '../services/config.service';
import { apiWorld } from '../hooks/api-global-setup';

interface AtlassianFixture {
    loggedHomePage: LoggedHomePage;
    configService: ConfigService;
    loginPage: LoginPage;
}

const storageState = (workerId: number): string => `.auth/storage-state-worker-${workerId}.json`;

export const test = base.extend<AtlassianFixture>({
    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        // console.log('Config loaded for tests:', configService.config);
        await use(configService);
    },
    loggedHomePage: async ({ browser, configService }, use) => {
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
        const loggedPage = new LoggedHomePage(page, configService.config.uiConfig.loggedBaseUrl);
        await loggedPage.goTo();
        await use(loggedPage);

        // disposal
        await page.close();
        await context.close();
    },
    loginPage: async ({ page, configService }, use) => {
        const loginPage = new LoginPage(page, configService.config.uiConfig.loginBaseUrl);
        await use(loginPage);
    }
});

async function authenticateFopHelp(browser: Browser, workerId: number, configService: ConfigService): Promise<void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, configService.config.uiConfig.loginBaseUrl);

    await loginPage.goTo();
    await loginPage.login(configService.config.auth.uiEmail, configService.config.auth.password);

    await page.context().storageState({ path: storageState(workerId) });
    await context.close();
}
