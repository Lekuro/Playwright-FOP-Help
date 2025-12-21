import { IApiService } from '../services/abstractions/i-api-service';
import { IIncomesResponseDto } from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class IncomesApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getIncomes(): Promise<[Response, IIncomesResponseDto]> {
        const response = await this.apiService.get('/api/v2/incomes');
        // console.log('💰 getIncomes response:', response);
        const responseBody = (await response.json()) as IIncomesResponseDto;

        return [response, responseBody];
    }
}
