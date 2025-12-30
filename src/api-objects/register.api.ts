// import { IApiService } from '../services/abstractions/i-api-service';
// import { IRegisterRequestDto, IRegisterResponseDto, IConfirmEmailResponseDto } from '../models/api-models/index.dto';
// // import { APIResponse } from 'playwright';
// // import * as fs from 'fs';

// export class RegisterApi {
//     public constructor(private readonly apiService: IApiService<Response /* | APIResponse*/>) {}
//     public async register(requestBody: IRegisterRequestDto): Promise<[Response /*| APIResponse*/, IRegisterResponseDto]> {
//         const response = await this.apiService.post('/api/react/authenticate/register', requestBody);
//         const responseBody = (await response.json()) as IRegisterResponseDto;
//         return [response, responseBody];
//     }


//     public async confirm(): Promise<[Response, IConfirmEmailResponseDto]> {
//         const response = await this.apiService.get(`/api/react/authenticate/confirm?userId=${userId}&code=${code}`);
//         const responseBody = await response.json();

//         return [response, responseBody];
//     }
// }
