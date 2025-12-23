import { Locator } from '@playwright/test';

export class HeaderLoggedComponent {
    private get linkHomePage(): Locator {
        return this.headerLogged.locator('a[href="/"]');
    }
    private get welcomeText(): Locator {
        return this.headerLogged.locator('.welcome-text');
    }
    private get themeToggle(): Locator {
        return this.headerLogged.locator('.theme-toggle');
    }
    private get buttonExit(): Locator {
        return this.headerLogged.locator('//button[text()="Вийти"]');
    }
    private get btnRemoveAccount(): Locator {
        return this.headerLogged.locator('//button[text()="Видалити акаунт"]');
    }

    public constructor(private readonly headerLogged: Locator) {}

    public async clickLinkHomePage(): Promise<void> {
        await this.linkHomePage.click();
    }
    public async hoverWelcomeText(): Promise<void> {
        await this.welcomeText.hover();
    }
    public async clickBtnExit(): Promise<void> {
        await this.buttonExit.click();
    }
    public async clickBtnRemoveAccount(): Promise<void> {
        await this.btnRemoveAccount.click();
    }
    public async clickToggleTheme(): Promise<void> {
        await this.themeToggle.click();
    }
    public async getWelcomeText(): Promise<string> {
        return (await this.welcomeText.textContent()) || '';
    }
    public async getUserEmail(): Promise<string> {
        const emailElement = this.welcomeText.locator('strong');
        return (await emailElement.textContent()) || '';
    }
    public async getFullWelcomeText(): Promise<string> {
        const fullText = await this.getWelcomeText();
        return fullText.replace(/▼|👤/g, '').trim();
    }
    public async isUserEmailDisplayed(expectedEmail: string): Promise<boolean> {
        const userEmail = await this.getUserEmail();
        return userEmail === expectedEmail;
    }
    public async getUserRole(): Promise<string> {
        const roleIcon = this.welcomeText.locator('.role-icon');
        return (await roleIcon.getAttribute('title')) || '';
    }
}
