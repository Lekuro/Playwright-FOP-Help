import { IApiService } from '../services/abstractions/i-api-service';
import { ILoginRequestDto, ILoginResponseDto, IShowUserInfoResponseDto } from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class LoginApi {
    public constructor(private readonly apiService: IApiService<Response /* | APIResponse*/>) {}
    public async login(requestBody: ILoginRequestDto): Promise<[Response /*| APIResponse*/, ILoginResponseDto]> {
        const response = await this.apiService.post('/api/react/authenticate/login', requestBody);
        const responseBody = (await response.json()) as ILoginResponseDto;
        return [response, responseBody];
    }

    public async showUserInfo(): Promise<[Response, IShowUserInfoResponseDto]> {
        const response = await this.apiService.get('/api/react/authenticate/show');
        console.log('👤 showUserInfo response status:', response.status, response);
        const responseBody = (await response.json()) as IShowUserInfoResponseDto;

        return [response, responseBody];
    }
}
