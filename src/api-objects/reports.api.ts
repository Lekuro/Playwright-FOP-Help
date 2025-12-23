import { IApiService } from '../services/abstractions/i-api-service';
import { IReportResponseDto, IReportRequestDto, IDetailedResponseDto, IRemoveReportRequestDto } from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class ReportsApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getReports(): Promise<[Response, IReportResponseDto[]]> {
        const response = await this.apiService.get('/api/v2/reports');
        const responseBody = (await response.json()) as IReportResponseDto[];
        return [response, responseBody];
    }

    public async getPendingReports(): Promise<[Response, IReportResponseDto[]]> {
        const response = await this.apiService.get('/api/v2/reports?pending=true');
        const responseBody = (await response.json()) as IReportResponseDto[];
        return [response, responseBody];
    }

    public async getReportDetails(body: IReportRequestDto): Promise<[Response, IDetailedResponseDto]> {
        const response = await this.apiService.post('/api/v2/reports/details', body);
        const responseBody = (await response.json()) as IDetailedResponseDto;
        return [response, responseBody];
    }

    public async saveReport(body: IReportRequestDto): Promise<[Response, string]> {
        const response = await this.apiService.post('/api/v2/reports/save', body);
        const responseBody = (await response.text()) as string;
        return [response, responseBody];
    }

    public async getSavedReports(): Promise<[Response, IReportResponseDto[]]> {
        const response = await this.apiService.get('/api/v2/reports/saved');
        const responseBody = (await response.json()) as IReportResponseDto[];
        return [response, responseBody];
    }

    public async removeReport(body: IRemoveReportRequestDto): Promise<[Response, IDetailedResponseDto]> {
        const response = await this.apiService.post('/api/v2/reports/remove', body);
        // console.log('👤 showUserInfo response status:', response, 'body->>', await response.text());
        const responseBody = (await response.json()) as IDetailedResponseDto;
        return [response, responseBody];
    }
}
