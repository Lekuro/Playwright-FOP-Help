import { IApiService } from '../services/abstractions/i-api-service';
import {
    ITaxUuidRequestDto,
    ITaxItemDto
    // ICreateIncomeRequestDto,
    // IUpdateIncomeRequestDto,
    // IDeleteIncomeRequestDto
} from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class TaxesApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getTaxes(): Promise<[Response, ITaxItemDto[]]> {
        const response = await this.apiService.get('/api/v2/taxes');
        const responseBody = (await response.json()) as ITaxItemDto[];
        return [response, responseBody];
    }

    public async getPendingTaxes(): Promise<[Response, ITaxItemDto[]]> {
        const response = await this.apiService.get('/api/v2/taxes/pending');
        const responseBody = (await response.json()) as ITaxItemDto[];
        return [response, responseBody];
    }

    public async getPayedTaxes(): Promise<[Response, ITaxItemDto[]]> {
        const response = await this.apiService.get('/api/v2/taxes/payed');
        const responseBody = (await response.json()) as ITaxItemDto[];
        return [response, responseBody];
    }

    public async payTaxes(requestBody: ITaxUuidRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/taxes/pay', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }
    public async removeTax(requestBody: ITaxUuidRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/taxes/remove', requestBody);
        const responseBody = await response.text();
        return [response, responseBody];
    }
}
