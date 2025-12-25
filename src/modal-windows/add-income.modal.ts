import { Locator } from '@playwright/test';

export class AddIncomeModal {
    private get inputAmount(): Locator {
        return this.addIncomeModal.locator('#amount');
    }
    private get textareaComment(): Locator {
        return this.addIncomeModal.locator('#comment');
    }
    private get btnSubmit(): Locator {
        return this.addIncomeModal.locator('button[type="submit"]');
    }
    // public get linkForgotPassword(): Locator {
    //     return this.loginModal.locator('//form//*[contains(text(), "Забули пароль?")]');
    // }
    // private get linkRegister(): Locator {
    //     return this.loginModal.locator('//form//*[contains(text(), "Зареєструватися")]');
    // }
    // private get closeModal(): Locator {
    //     return this.loginModal.locator('button[aria-label="Close modal"]');
    // }
    // private get title(): Locator {
    //     return this.loginModal.locator('h2');
    // }
    // public get errorEnterEmail(): Locator {
    //     return this.loginModal.locator('input[type="email"] + p');
    // }

    // public get errorEnterPassword(): Locator {
    //     return this.loginModal.locator('input[type="password"] + p');
    // }

    // public get errorEmailShouldContainSymbol(): Locator {
    //     return this.loginModal.locator('//form//*[contains(text(), "Електрона адреса має містити знак")]');
    // }

    // public get errorInvalidUsernameOrPassword(): Locator {
    //     return this.loginModal.locator('//form//*[contains(text(), "Invalid username or password")]');
    // }

    public constructor(private readonly addIncomeModal: Locator) {}

    public async fillAmount(amount: string): Promise<void> {
        await this.inputAmount.fill(amount);
    }
    public async fillComment(comment: string): Promise<void> {
        await this.textareaComment.fill(comment);
    }
    // public async clickForgotPassword(): Promise<void> {
    //     await this.linkForgotPassword.click();
    // }
    // public async clickRegister(): Promise<void> {
    //     await this.linkRegister.click();
    // }
    public async clickSubmit(): Promise<void> {
        await this.btnSubmit.click();
    }
    // public async clickCloseModal(): Promise<void> {
    //     await this.closeModal.click();
    // }
    // public async getTitle(): Promise<string> {
    //     const title = await this.title.textContent();
    //     return title?.trim() || '';
    // }
}
