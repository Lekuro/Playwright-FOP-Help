// // import { APIResponse } from 'playwright';
// import { TheDogImageApi } from './apis/the-dog-api/images.api';
// import { ConfigService } from './services/config.service';
// import { FetchApiService } from './services/fetch-api.service';
// import { IApiService } from './services/abstractions/i-api-service';
// import { RdApi } from './apis/rd/rd.api';
// import { PlaywrightApiService } from './services/playwright-api.service';
// import { APIResponse } from 'playwright';

// export class ApiWorld {
//     public age?: number;
//     public testContext: Record<string, unknown> = {};

//     public get theDogsImagesApiService(): TheDogImageApi {
//         if (!this._imagesApi) {
//             this._imagesApi = new TheDogImageApi(this._theDogsFetchApiService);
//         }
//         return this._imagesApi;
//     }

//     // public get jiraApi(): JiraApi {
//     //     if (!this._jiraApi) {
//     //         this._jiraApi = new JiraApi(this._jiraApiService);
//     //     }
//     //     return this._jiraApi;
//     // }

//     public get rdApi(): RdApi {
//         if (!this._rdApi) {
//             this._rdApi = new RdApi(this._rdApiService);
//         }
//         return this._rdApi;
//     }

//     public dogsImageApi: TheDogImageApi;

//     public get configService(): ConfigService {
//         return this._configService;
//     }

//     private _imagesApi?: TheDogImageApi;
//     // private _jiraApi?: JiraApi;
//     private _rdApi?: RdApi;
//     private rdApiInstance?: RdApi;
//     private _theDogsFetchApiService: IApiService<Response>;
//     // private _jiraApiService: IApiService<Response | APIResponse>;
//     private _rdApiService: IApiService<APIResponse>;
//     private _configService: ConfigService;

//     public constructor() {
//         this._configService = new ConfigService();
//         const config = this._configService.getConfig();

//         this._theDogsFetchApiService = new FetchApiService(config.api.theDogsApi.baseUrl, { apiKey: config.auth?.theDogsApi?.apiKey });

//         // const jiraBase64token = Buffer.from(`${config.auth.jiraApi.userName}:${config.auth.jiraApi.token}`).toString('base64');
//         // this._jiraApiService = new FetchApiService(config.api.jira.baseUrl, { basicToken: jiraBase64token });

//         this.dogsImageApi = new TheDogImageApi(this._theDogsFetchApiService);

//         this._rdApiService = new PlaywrightApiService(config.api.rd.baseUrl, { jwtToken: config.auth.rdApi.token });
//         this.rdApiInstance = new RdApi(this._rdApiService);
//     }
// }
