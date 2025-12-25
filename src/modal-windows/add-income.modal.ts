import { Locator } from '@playwright/test';

export class AddIncomeModal {
    private get inputAmount(): Locator {
        return this.addIncomeModal.locator('input#amount');
    }
    private get textareaComment(): Locator {
        return this.addIncomeModal.locator('textarea#comment');
    }
    private get btnSubmit(): Locator {
        return this.addIncomeModal.locator('button[type="submit"]');
    }
    private get successMessage(): Locator {
        return this.addIncomeModal.locator('//span[text(), "Дохід успішно додано"]');
    }
    public get inputDate(): Locator {
        return this.addIncomeModal.locator('input#date');
    }
    public get currencySelect(): Locator {
        return this.addIncomeModal.locator('select#currency');
    }
    public get isWithoutIncomeCheckbox(): Locator {
        return this.addIncomeModal.locator('//span[contains(text(), "місяць не було")]/../input');
    }
    public get isCashCheckbox(): Locator {
        return this.addIncomeModal.locator('//span[contains(text(), "Готівкові кошти")]/../input');
    }
    public get closeModal(): Locator {
        return this.addIncomeModal.locator('//button[@aria-label="Close modal"]');
    }

    public constructor(private readonly addIncomeModal: Locator) {}

    public async fillAmount(amount: string): Promise<void> {
        await this.inputAmount.fill(amount);
    }
    public async fillComment(comment: string): Promise<void> {
        await this.textareaComment.fill(comment);
    }
    public isSuccessMessage(): Promise<boolean> {
        return this.successMessage.isVisible();
    }
    public async clickSubmit(): Promise<void> {
        await this.btnSubmit.click();
    }
    public async clickCloseModal(): Promise<void> {
        await this.closeModal.click();
    }
    public async fillCurrency(currency: string): Promise<void> {
        await this.currencySelect.selectOption(currency);
    }
    public async fillDate(date: string): Promise<void> {
        await this.inputDate.fill(date);
    }
    public async changeIsCashCheckbox(): Promise<void> {
        const isChecked = await this.isCashCheckbox.isChecked();
        if (!isChecked) {
            await this.isCashCheckbox.check();
        } else {
            await this.isCashCheckbox.uncheck();
        }
    }
    public async changeIsWithoutIncomeCheckbox(): Promise<void> {
        const isChecked = await this.isWithoutIncomeCheckbox.isChecked();
        if (!isChecked) {
            await this.isWithoutIncomeCheckbox.check();
        } else {
            await this.isWithoutIncomeCheckbox.uncheck();
        }
    }
}
