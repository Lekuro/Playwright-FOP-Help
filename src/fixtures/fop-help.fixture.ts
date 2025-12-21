import { test as base, Browser } from '@playwright/test';
import { LoggedHomePage, LoginPage } from '../pages/index';
import * as fs from 'fs';
import { ConfigService } from '../services/config.service';
import { apiWorld } from '../hooks/api-global-setup';

interface AtlassianFixture {
    loggedHomePage: LoggedHomePage;
    configService: ConfigService;
    loginPage: LoginPage;
    apiWorld: typeof apiWorld;
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
        const page = await context.newPage();
        const loggedPage = new LoggedHomePage(page, configService.config.uiConfig.loggedBaseUrl);
        // Інтерсептор для перехоплення всіх відповідей
        await page.route(configService.config.uiConfig.loginBaseUrl, async (route) => {
            // const response = await route.continue();
            const response = await route.fetch();
            console.log(`➡️ Перехоплено відповідь: ${response} `);
            // Витягуємо Set-Cookie з заголовків відповіді
            const setCookie = response.headers()['set-cookie'];
            if (setCookie) {
                console.log('🍪 Перехоплено Set-Cookie:', setCookie);
                process.env.PLAYWRIGHT_COOKIES = setCookie;
                // configService.config.auth.uiCookies = setCookie;
                apiWorld.configService.config.auth.uiCookies = setCookie;
                console.log('🍪 Збережено cookies в конфігурації:', configService.config);
            }

            return response;
        });
        await loggedPage.goTo();
        await use(loggedPage);

        // disposal
        await page.close();
        await context.close();
    },
    loginPage: async ({ page, configService }, use) => {
        const loginPage = new LoginPage(page, configService.config.uiConfig.loginBaseUrl);
        await use(loginPage);
    },
    apiWorld: async ({ configService, loggedHomePage }, use) => {
        // Інтерсептор для перехоплення всіх відповідей
        await loggedHomePage.page.route(configService.config.uiConfig.loginBaseUrl, async (route) => {
            // const response = await route.continue();
            const response = await route.fetch();
            console.log(`➡️ Перехоплено відповідь: ${response} `);
            // Витягуємо Set-Cookie з заголовків відповіді
            const setCookie = response.headers()['set-cookie'];
            if (setCookie) {
                console.log('🍪 Перехоплено Set-Cookie:', setCookie);
                process.env.PLAYWRIGHT_COOKIES = setCookie;
                // configService.config.auth.uiCookies = setCookie;
                apiWorld.configService.config.auth.uiCookies = setCookie;
                console.log('🍪 Збережено cookies в конфігурації:', configService.config);
            }

            return setCookie;
        });
        await use(apiWorld);
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
