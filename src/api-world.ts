// import { APIResponse } from 'playwright';
import { LoginApi } from './api-objects/index.api';
import { ConfigService } from './services/config.service';
import { FetchApiService } from './services/fetch-api.service';
import { IApiService } from './services/abstractions/i-api-service';
// import { RdApi } from './apis/rd/rd.api';
// import { PlaywrightApiService } from './services/playwright-api.service';
// import { APIResponse } from 'playwright';

export class ApiWorld {
    public get loginApi(): LoginApi {
        if (!this._loginApi) {
            this._loginApi = new LoginApi(this._theLoginFetchApiService);
        }
        return this._loginApi;
    }

    public get configService(): ConfigService {
        return this._configService;
    }

    // public get jiraApi(): JiraApi {
    //     if (!this._jiraApi) {
    //         this._jiraApi = new JiraApi(this._jiraApiService);
    //     }
    //     return this._jiraApi;
    // }

    // public get rdApi(): RdApi {
    //     if (!this._rdApi) {
    //         this._rdApi = new RdApi(this._rdApiService);
    //     }
    //     return this._rdApi;
    // }

    private _loginApi: LoginApi;

    // private _imagesApi?: TheDogImageApi;
    // private _jiraApi?: JiraApi;
    // private _rdApi?: RdApi;
    // private rdApiInstance?: RdApi;
    private _theLoginFetchApiService: IApiService<Response>;
    // private _jiraApiService: IApiService<Response | APIResponse>;
    // private _rdApiService: IApiService<APIResponse>;
    private _configService: ConfigService;

    public constructor() {
        this._configService = new ConfigService();
        const config = this._configService.config;

        this._theLoginFetchApiService = new FetchApiService(config.apiConfig.fopHelpApiUrl, {});

        // const jiraBase64token = Buffer.from(`${config.auth.jiraApi.userName}:${config.auth.jiraApi.token}`).toString('base64');
        // this._jiraApiService = new FetchApiService(config.api.jira.baseUrl, { basicToken: jiraBase64token });

        this._loginApi = new LoginApi(this._theLoginFetchApiService);

        // this._rdApiService = new PlaywrightApiService(config.api.rd.baseUrl, { jwtToken: config.auth.rdApi.token });
        // this.rdApiInstance = new RdApi(this._rdApiService);
    }
}
