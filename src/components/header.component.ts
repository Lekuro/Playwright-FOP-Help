import { Locator } from '@playwright/test';

export class HeaderComponent {
    private get linkHomePage(): Locator {
        return this.header.locator('a[href="/"]');
    }
    private get themeToggle(): Locator {
        return this.header.locator('.theme-toggle');
    }
    private get pageName(): Locator {
        return this.header.locator('span.page-name');
    }

    // Logged out locators
    private get signInButton(): Locator {
        return this.header.locator('.signin-button');
    }
    private get signUpButton(): Locator {
        return this.header.locator('.register-button');
    }

    // Logged in locators
    private get welcomeText(): Locator {
        return this.header.locator('.welcome-text');
    }
    private get buttonExit(): Locator {
        return this.header.locator('//button[text()="Вийти"]');
    }
    private get btnRemoveAccount(): Locator {
        return this.header.locator('//button[text()="Видалити акаунт"]');
    }

    public constructor(private readonly header: Locator) {}

    public async clickHomePage(): Promise<void> {
        await this.linkHomePage.click();
    }
    public async clickToggleTheme(): Promise<void> {
        await this.themeToggle.click();
    }
    public async getThemeState(): Promise<string> {
        const themeData = await this.themeToggle.getAttribute('aria-label');
        return themeData || '';
    }
    public async getPageName(): Promise<string> {
        const pageName = await this.pageName.textContent();
        return pageName || '';
    }

    // Logged out methods
    public async clickSignIn(): Promise<void> {
        await this.signInButton.click();
    }
    public async clickSignUp(): Promise<void> {
        await this.signUpButton.click();
    }

    // Logged in methods
    public async hoverWelcomeText(): Promise<void> {
        await this.welcomeText.hover();
    }
    public async clickExit(): Promise<void> {
        await this.buttonExit.click();
    }
    public async clickRemoveAccount(): Promise<void> {
        await this.btnRemoveAccount.click();
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
