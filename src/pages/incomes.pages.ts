import { Locator, Page } from '@playwright/test';
import {} from 'src/components/index.component';
import { AddIncomeModal } from '../modal-windows/index.modal';
import { HomePage } from './home.page';

export class IncomesPage extends HomePage {
    private get addButton(): Locator {
        return this.page.locator('button.add-button');
    }

    public readonly addIncomeModal: AddIncomeModal;

    public constructor(page: Page, _url: string) {
        super(page, _url);

        this.addIncomeModal = new AddIncomeModal(this.page.locator('.modal-content'));
    }

    public async clickAddIncome(): Promise<void> {
        await this.addButton.click();
    }
}
