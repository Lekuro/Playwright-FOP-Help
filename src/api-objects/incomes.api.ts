import { IApiService } from '../services/abstractions/i-api-service';
import {
    IIncomesResponseDto,
    ICreateIncomeRequestDto,
    IUpdateIncomeRequestDto,
    IDeleteIncomeRequestDto
} from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class IncomesApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getIncomes(): Promise<[Response, IIncomesResponseDto]> {
        const response = await this.apiService.get('/api/v2/incomes');
        const responseBody = (await response.json()) as IIncomesResponseDto;
        return [response, responseBody];
    }

    public async addIncome(requestBody: ICreateIncomeRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/incomes/add', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }

    public async updateIncome(requestBody: IUpdateIncomeRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/incomes/update', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }

    public async deleteIncome(requestBody: IDeleteIncomeRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/incomes/delete', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }
}
