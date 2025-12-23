import { Locator } from '@playwright/test';

export class NavigateComponent {
    private get linkIncomes(): Locator {
        return this.headerLogin.locator('a[href="/incomes"]');
    }
    private get linkExpenses(): Locator {
        return this.headerLogin.locator('a[href="/expenses"]');
    }
    private get buttonTaxes(): Locator {
        return this.headerLogin.locator('//*[text()="Податки"]');
    }
    private get linkTaxesAll(): Locator {
        return this.headerLogin.locator('a[href="/taxes/all"]');
    }
    private get linkTaxesPending(): Locator {
        return this.headerLogin.locator('a[href="/taxes/pending"]');
    }
    private get linkTaxesPaid(): Locator {
        return this.headerLogin.locator('a[href="/taxes/paid"]');
    }
    private get buttonReports(): Locator {
        return this.headerLogin.locator('//*[text()="Звіти"]');
    }
    private get linkReportsAll(): Locator {
        return this.headerLogin.locator('a[href="/reports/all"]');
    }
    private get linkReportsCurrent(): Locator {
        return this.headerLogin.locator('a[href="/reports/current"]');
    }
    private get linkReportsSubmitted(): Locator {
        return this.headerLogin.locator('a[href="/reports/submitted"]');
    }

    public constructor(private readonly headerLogin: Locator) {}

    public async clickIncomes(): Promise<void> {
        await this.linkIncomes.click();
    }
    public async clickExpenses(): Promise<void> {
        await this.linkExpenses.click();
    }
    public async hoverButtonTaxes(): Promise<void> {
        await this.buttonTaxes.hover();
    }
    public async clickButtonTaxes(): Promise<void> {
        await this.buttonTaxes.click();
    }
    public async clickLinkTaxesAll(): Promise<void> {
        await this.linkTaxesAll.click();
    }
    public async clickLinkTaxesPending(): Promise<void> {
        await this.linkTaxesPending.click();
    }
    public async clickLinkTaxesPaid(): Promise<void> {
        await this.linkTaxesPaid.click();
    }
    public async hoverButtonReports(): Promise<void> {
        await this.buttonReports.hover();
    }
    public async clickButtonReports(): Promise<void> {
        await this.buttonReports.click();
    }
    public async clickLinkReportsAll(): Promise<void> {
        await this.linkReportsAll.click();
    }
    public async clickLinkReportsCurrent(): Promise<void> {
        await this.linkReportsCurrent.click();
    }
    public async clickLinkReportsSubmitted(): Promise<void> {
        await this.linkReportsSubmitted.click();
    }
}
