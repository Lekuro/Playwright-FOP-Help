export interface ConfigDto {
    auth: AuthDto;
    uiConfig: UiConfigDto;
    apiConfig: ApiConfigDto;
}

export interface AuthDto {
    uiEmail: string;
    apiEmail: string;
    password: string;
    apiToken?: string;
    apiCookies?: string;
    uiCookies?: string;
}

export interface UiConfigDto {
    loggedBaseUrl: string;
    loginBaseUrl: string;
}

export interface ApiConfigDto {
    fopHelpApiUrl: string;
}
