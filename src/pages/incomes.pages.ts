import { Locator, Page } from '@playwright/test';
import { IncomeRow } from 'src/components/index.component';
import { AddIncomeModal } from '../modal-windows/index.modal';
import { HomePage } from './home.page';
// import { IIncomeTableRowDto } from 'src/models/ui/index.dto';

export class IncomesPage extends HomePage {
    private get addButton(): Locator {
        return this.page.locator('button.add-button');
    }

    public readonly addIncomeModal: AddIncomeModal;
    public readonly incomeRow: IncomeRow;

    public constructor(page: Page, _url: string) {
        super(page, _url);
        // this.goTo('incomes/');
        this.addIncomeModal = new AddIncomeModal(this.page.locator('.modal-content'));
        this.incomeRow = new IncomeRow(this.page.locator('tbody tr:first-child'));
    }

    public async clickAddIncome(): Promise<void> {
        await this.addButton.click();
    }
    public getIncomeRow(rowIndex: number): IncomeRow {
        return new IncomeRow(this.page.locator('tbody>tr').nth(rowIndex));
    }
}
