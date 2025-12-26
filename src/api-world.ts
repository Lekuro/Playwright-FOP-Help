import { AuthenticateApi } from './api-objects/authenticate.api';
import { LoginApi, IncomesApi, ExpensesApi, TaxesApi, ReportsApi } from './api-objects/index.api';
import { ConfigService } from './services/config.service';
import { FetchApiService } from './services/fetch-api.service';
import { IApiService } from './services/abstractions/i-api-service';

export class ApiWorld {
    public get loginApi(): LoginApi {
        if (!this._loginApi) {
            this._loginApi = new LoginApi(this._theFetchApiService);
        }
        return this._loginApi;
    }
    public get authenticateApi(): AuthenticateApi {
        if (!this._authenticateApi) {
            this._authenticateApi = new AuthenticateApi(this._theLoggedFetchApiService);
        }
        return this._authenticateApi;
    }

    public get incomesApi(): IncomesApi {
        if (!this._incomesApi) {
            this._incomesApi = new IncomesApi(this._theLoggedFetchApiService);
        }
        return this._incomesApi;
    }

    public get expensesApi(): ExpensesApi {
        if (!this._expensesApi) {
            this._expensesApi = new ExpensesApi(this._theLoggedFetchApiService);
        }
        return this._expensesApi;
    }

    public get taxesApi(): TaxesApi {
        if (!this._taxesApi) {
            this._taxesApi = new TaxesApi(this._theLoggedFetchApiService);
        }
        return this._taxesApi;
    }

    public get reportsApi(): ReportsApi {
        if (!this._reportsApi) {
            this._reportsApi = new ReportsApi(this._theLoggedFetchApiService);
        }
        return this._reportsApi;
    }

    public get configService(): ConfigService {
        return this._configService;
    }

    private _loginApi: LoginApi;
    private _authenticateApi: AuthenticateApi;
    private _incomesApi: IncomesApi;
    private _expensesApi: ExpensesApi;
    private _taxesApi: TaxesApi;
    private _reportsApi: ReportsApi;
    private _theFetchApiService: IApiService<Response>;
    private _theLoggedFetchApiService: IApiService<Response>;
    private _configService: ConfigService;

    public constructor() {
        this._configService = new ConfigService();
        const config = this._configService.config;
        this._theFetchApiService = new FetchApiService(config.apiConfig.fopHelpApiUrl, {});
        this._theLoggedFetchApiService = new FetchApiService(config.apiConfig.fopHelpApiUrl, {
            cookies: config.auth.apiCookies
        });

        this._loginApi = new LoginApi(this._theFetchApiService);
        this._authenticateApi = new AuthenticateApi(this._theLoggedFetchApiService);
        this._incomesApi = new IncomesApi(this._theLoggedFetchApiService);
        this._expensesApi = new ExpensesApi(this._theLoggedFetchApiService);
        this._taxesApi = new TaxesApi(this._theLoggedFetchApiService);
        this._reportsApi = new ReportsApi(this._theLoggedFetchApiService);
    }
}
