import { test as base, Browser } from '@playwright/test';
import { LoggedHomePage, LoginPage } from '../pages/index';
import * as fs from 'fs';
import { ConfigService } from '../services/config.service';

interface AtlassianFixture {
    loggedHomePage: LoggedHomePage;
    configService: ConfigService;
    loginPage: LoginPage;
}

const storageState = (workerId: number): string => `.auth/storage-state-worker-${workerId}.json`;

export const test = base.extend<AtlassianFixture>({
    loggedHomePage: async ({ browser, configService }, use) => {
        const workerId = test.info().workerIndex;
        await authenticateFopHelp(browser, workerId, configService);

        const context = await browser.newContext({
            storageState: storageState(workerId),
            recordVideo: {
                dir: 'test-results/videos'
            }
        });
        const page = await context.newPage();
        const loggedHomePage = new LoggedHomePage(page, configService.config.uiConfig.loggedBaseUrl);
        await use(loggedHomePage);

        // disposal
        await page.close();
        await context.close();
    },
    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        await use(configService);
    },
    loginPage: async ({ page, configService }, use) => {
        const loginPage = new LoginPage(page, configService.config.uiConfig.loginBaseUrl);
        await use(loginPage);
    }
});

async function authenticateFopHelp(browser: Browser, workerId: number, configService: ConfigService): Promise<LoginPage | void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, configService.config.uiConfig.loginBaseUrl);
    await loginPage.login(configService.config.auth.login, configService.config.auth.password, workerId);
    await page.context().storageState({ path: `./.auth/storage-state-worker-${workerId}.json` });
    // await context.close();
    return loginPage;
}
