import { IApiService } from '../services/abstractions/i-api-service';
import { IShowUserInfoResponseDto } from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class AuthenticateApi {
    public constructor(private readonly apiService: IApiService<Response /* | APIResponse*/>) {}

    // Універсальний метод для парсингу відповіді
    private async parseResponse<T>(response: Response): Promise<T> {
        if (response.body instanceof ReadableStream) {
            const text = await response.text();
            return JSON.parse(text) as T;
        }
        return (await response.json()) as T;
    }

    public async showUserInfo(): Promise<[Response, IShowUserInfoResponseDto]> {
        const response = await this.apiService.get('/api/react/authenticate/show');
        console.log('👤 showUserInfo response status:', response);
        const responseBody = await this.parseResponse<IShowUserInfoResponseDto>(response);
        return [response, responseBody];
    }

    public async checkAdmin(): Promise<[Response, boolean]> {
        const response = await this.apiService.get('/api/react/authenticate/checkadmin');
        const responseBody = await this.parseResponse<boolean>(response);
        return [response, responseBody];
    }

    public async refreshCookies(): Promise<[Response, string | null]> {
        const response = await this.apiService.get('/api/react/authenticate/refresh');
        const cookies = response.headers.get('set-cookie');
        return [response, cookies];
    }

    public async logout(): Promise<[Response, IShowUserInfoResponseDto]> {
        const response = await this.apiService.get('/api/react/authenticate/logout');
        const responseBody = await this.parseResponse<IShowUserInfoResponseDto>(response);
        return [response, responseBody];
    }
}
