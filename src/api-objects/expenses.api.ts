import { IApiService } from '../services/abstractions/i-api-service';
import {
    IExpensesResponseDto,
    ICreateExpenseRequestDto,
    IUpdateExpenseRequestDto,
    IDeleteExpenseRequestDto
} from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class ExpensesApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getExpenses(): Promise<[Response, IExpensesResponseDto]> {
        const response = await this.apiService.get('/api/v2/expenses');
        const responseBody = (await response.json()) as IExpensesResponseDto;
        return [response, responseBody];
    }

    public async addExpense(requestBody: ICreateExpenseRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/expenses/add', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }

    public async updateExpense(requestBody: IUpdateExpenseRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/expenses/update', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }

    public async deleteExpense(requestBody: IDeleteExpenseRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/expenses/delete', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }
}
