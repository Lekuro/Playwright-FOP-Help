import { IApiService } from '../services/abstractions/i-api-service';
import { LoginRequestDto, LoginResponseDto } from '../models/api-models/index.dto';
// import { APIResponse } from 'playwright';
// import * as fs from 'fs';

export class LoginApi {
    public constructor(private readonly apiService: IApiService<Response /* | APIResponse*/>) {}
    public async login(requestBody: LoginRequestDto): Promise<[Response /*| APIResponse*/, LoginResponseDto]> {
        const response = await this.apiService.post('/api/react/authenticate/login', requestBody);
        const responseBody = (await response.json()) as LoginResponseDto;
        return [response, responseBody];
    }

    // public async uploadImage(imagePath: string, subId?: string, breeds?: string[]): Promise<[Response, ImageDto]> {
    //     const formData = new FormData();
    //     const file = fs.readFileSync(imagePath);
    //     // node 24.x
    //     const binaryFile = new File([new Uint8Array(file)], 'the_dog_1.jpg', { type: 'image/jpeg' });

    //     // node 22.x
    //     // const binaryFile = new File([file], 'the_dog_1.jpg', { type: 'image/jpeg' });

    //     formData.append('file', binaryFile);
    //     subId && formData.append('sub_id', subId);
    //     breeds && formData.append('breeds', breeds.join(','));
    //     console.log(breeds);

    //     const response = await this.apiService.postForm('/images/upload', formData);
    //     // const response2 = await fetch (`${this.baseUrl}/images/upload`, { method: 'POST', body: formData });

    //     const imageResponse = await response.json();

    //     return [response, imageResponse];
    // }

    // public async getMyImages(): Promise<[Response, ImageDto[]]> {
    //     const response = await this.apiService.get('/images');
    //     const images = await response.json();

    //     return [response, images];
    // }
}
