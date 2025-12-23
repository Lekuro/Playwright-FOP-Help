import { Locator } from '@playwright/test';

export class HeaderLoginComponent {
    private get linkHomePage(): Locator {
        return this.headerLogin.locator('a[href="/"]');
    }
    private get signInButton(): Locator {
        return this.headerLogin.locator('.signin-button');
    }
    private get signUpButton(): Locator {
        return this.headerLogin.locator('.register-button');
    }
    private get themeToggle(): Locator {
        return this.headerLogin.locator('.theme-toggle');
    }

    public constructor(private readonly headerLogin: Locator) {}

    public async clickLinkHomePage(): Promise<void> {
        await this.linkHomePage.click();
    }
    public async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
    public async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }
    public async clickToggleTheme(): Promise<void> {
        await this.themeToggle.click();
    }
}
