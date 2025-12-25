import { Locator } from '@playwright/test';

export class IncomeRow {
    private get dataCell(): Locator {
        return this.incomeRow.locator('.data-cell');
    }
    private get amountCell(): Locator {
        return this.incomeRow.locator('.amount-cell');
    }
    private get currencyCell(): Locator {
        return this.incomeRow.locator('.currency-cell');
    }
    private get cashCell(): Locator {
        return this.incomeRow.locator('.cash-cell');
    }
    private get commentCell(): Locator {
        return this.incomeRow.locator('.comment-cell');
    }
    private get modifyButton(): Locator {
        return this.incomeRow.locator('.modify-btn');
    }
    private get deleteButton(): Locator {
        return this.incomeRow.locator('.delete-btn');
    }

    public constructor(private readonly incomeRow: Locator) {}

    public async getDate(): Promise<string> {
        return this.dataCell.innerText();
    }
    public async getAmount(): Promise<string> {
        const fullText = await this.amountCell.innerText();
        return fullText.replace(/\s+/g, ''); // Remove all whitespace characters
    }
    public async getCurrency(): Promise<string> {
        const fullText = await this.currencyCell.innerText();
        return fullText.substring(2, 5);
    }

    public async getComment(): Promise<string> {
        return this.commentCell.innerText();
    }
    public async clickDelete(): Promise<void> {
        await this.deleteButton.click();
    }
    public async clickModify(): Promise<void> {
        await this.modifyButton.click();
    }
}
