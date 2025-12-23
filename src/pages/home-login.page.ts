import { Locator, Page } from '@playwright/test';
import { HeaderLoginComponent } from 'src/components/index.component';
import { NavigateComponent } from 'src/components/navigate-menu.component';

export class LoginPage {
    private get isLoggedInLocator(): Locator {
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

    public readonly headerLogin: HeaderLoginComponent;
    public readonly navigateMenu: NavigateComponent;

    public constructor(
        private readonly page: Page,
        private readonly _url: string
    ) {
        this.headerLogin = new HeaderLoginComponent(this.page.locator('.header-container'));
        this.navigateMenu = new NavigateComponent(this.page.locator('.nav-container'));
    }

    public async login(email: string, password: string): Promise<void> {
        if (await this.isLoggedInLocator.isVisible()) {
            return;
        }
        await this.headerLogin.clickSignInButton();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.btnSubmit.click();
        await this.isLoggedInLocator.waitFor();
        // await this.page.waitForTimeout(3000);
    }

    public async goTo(path?: string): Promise<void> {
        await this.page.goto(`${this._url}${path}`);
    }

    public async clickRegister(): Promise<void> {
        await this.linkRegister.click();
    }
}
