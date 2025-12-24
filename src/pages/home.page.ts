import { Locator, Page } from '@playwright/test';
import { HeaderComponent, NavigateComponent } from 'src/components/index.component';
import { LoginModal } from '../modal-windows/index.modal';

export class HomePage {
    private get isLoggedInLocator(): Locator {
        return this.page.locator('.user-info');
    }

    public get pageHeader(): Locator {
        return this.page.locator('//button[@aria-label="Close modal"]/../h2');
    }

    public readonly header: HeaderComponent;
    public readonly navigateMenu: NavigateComponent;
    public readonly loginModal: LoginModal;

    public constructor(
        public readonly page: Page,
        private readonly _url: string
    ) {
        this.header = new HeaderComponent(this.page.locator('.header-container'));
        this.navigateMenu = new NavigateComponent(this.page.locator('.nav-container'));
        this.loginModal = new LoginModal(this.page.locator('.sticky-header-nav>div>div'));
    }

    public async login(email: string, password: string): Promise<void> {
        if (await this.isLoggedInLocator.isVisible()) {
            return;
        }
        await this.header.clickSignInButton();
        await this.loginModal.fillEmail(email);
        await this.loginModal.fillPassword(password);
        await this.loginModal.clickSubmit();
        await this.isLoggedInLocator.waitFor();
        // await this.page.waitForTimeout(3000);
    }

    public async goTo(path?: string): Promise<void> {
        await this.page.goto(`${this._url}${path}`);
    }
    public async isLoggedIn(): Promise<boolean> {
        return this.isLoggedInLocator.isVisible();
    }
}
