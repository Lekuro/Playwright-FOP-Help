import { Locator } from '@playwright/test';

export class HeaderComponent {
    private get linkHomePage(): Locator {
        return this.headerLogin.locator('a[href="/"]');
    }
    private get themeToggle(): Locator {
        return this.headerLogin.locator('.theme-toggle');
    }

    // Logged out locators
    private get signInButton(): Locator {
        return this.headerLogin.locator('.signin-button');
    }
    private get signUpButton(): Locator {
        return this.headerLogin.locator('.register-button');
    }

    // Logged in locators
    private get welcomeText(): Locator {
        return this.headerLogin.locator('.welcome-text');
    }
    private get buttonExit(): Locator {
        return this.headerLogin.locator('//button[text()="Вийти"]');
    }
    private get btnRemoveAccount(): Locator {
        return this.headerLogin.locator('//button[text()="Видалити акаунт"]');
    }

    public constructor(private readonly headerLogin: Locator) {}

    public async clickLinkHomePage(): Promise<void> {
        await this.linkHomePage.click();
    }
    public async clickToggleTheme(): Promise<void> {
        await this.themeToggle.click();
    }

    // Logged out methods
    public async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
    public async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }

    // Logged in methods
    public async hoverWelcomeText(): Promise<void> {
        await this.welcomeText.hover();
    }
    public async clickBtnExit(): Promise<void> {
        await this.buttonExit.click();
    }
    public async clickBtnRemoveAccount(): Promise<void> {
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
