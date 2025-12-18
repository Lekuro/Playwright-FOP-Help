import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly _url = 'https://new.fophelp.pro/';

    private get signInButton(): Locator {
        return this.page.locator('.signin-button');
    }

    private get waitLoadedStateLocator(): Locator {
        return this.page.locator('.user-info');
    }

    private get inputEmail(): Locator {
        return this.page.locator('input[type="email"]');
    }

    private get inputPassword(): Locator {
        return this.page.locator('input[type="password"]');
    }

    private get btnSubmit(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    public get errorEnterEmail(): Locator {
        return this.page.locator('input[type="email"] + p');
    }

    public get errorEnterPassword(): Locator {
        return this.page.locator('input[type="password"] + p');
    }

    public get errorEmailShouldContainSymbol(): Locator {
        return this.page.locator('//form//*[contains(text(), "Електрона адреса має містити знак")]');
    }

    public get errorInvalidUsernameOrPassword(): Locator {
        return this.page.locator('//form//*[contains(text(), "Invalid username or password")]');
    }

    public get linkForgotPassword(): Locator {
        return this.page.locator('//form//*[contains(text(), "Забули пароль?")]');
    }

    private get linkRegister(): Locator {
        return this.page.locator('//form//*[contains(text(), "Зареєструватися")]');
    }

    public get pageHeader(): Locator {
        return this.page.locator('//button[@aria-label="Close modal"]/../h2');
    }

    public constructor(private readonly page: Page) {}

    public async login(email: string, password: string, workerId: number): Promise<void> {
        if (await this.waitLoadedStateLocator.isVisible()) {
            return;
        }
        await this.signInButton.click();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.btnSubmit.click();

        await this.page.context().storageState({ path: `./.auth/storage-state-worker-${workerId}.json` });
    }

    public async goTo(path?: string): Promise<void> {
        await this.page.goto(`${this._url}${path}`);
        // await this.waitLoadedStateLocator.waitFor(); //{ state: 'visible' }
    }

    public async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    public async clickRegister(): Promise<void> {
        await this.linkRegister.click();
    }
}
