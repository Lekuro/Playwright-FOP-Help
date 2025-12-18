export interface ConfigDto {
    auth: AuthDto;
    uiConfig: UiConfigDto;
    apiConfig: ApiConfigDto;
}

export interface AuthDto {
    login: string;
    password: string;
    apiToken: string;
}

export interface UiConfigDto {
    loggedBaseUrl: string;
    loginBaseUrl: string;
}

export interface ApiConfigDto {
    fopHelpApiUrl: string;
}
