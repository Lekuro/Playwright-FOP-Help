import { APIRequestContext, APIResponse, request } from 'playwright';
import { IApiService } from './abstractions/i-api-service';

export class PlaywrightApiService implements IApiService<APIResponse> {
    protected apiRequestContext?: APIRequestContext;

    public constructor(
        private baseUrl: string,
        private secret: { apiKey?: string; basicToken?: string; jwtToken?: string }
    ) {}

    public async get(uri: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = {
            ...this.getAuthHeader(),
            ...{
                'Content-Type': 'application/json',
                Accept: 'application/ld+json'
            }
        };

        const requestContext = await this.getRequestContext();
        const relativePath = this.convertToRelativePath(uri);
        const response = await requestContext.get(relativePath, {
            headers: defaultHeaders,
            params: params
        });

        return response;
    }

    public async post(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = {
            ...this.getAuthHeader(),
            ...{
                'Content-Type': 'application/json',
                Accept: 'application/ld+json'
            }
        };

        const requestContext = await this.getRequestContext();
        const relativePath = this.convertToRelativePath(uri);
        const response = await requestContext.post(relativePath, { headers: { ...defaultHeaders, ...headers }, data: body });

        return response;
    }

    public async postForm(uri: string, formData: FormData, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = this.getAuthHeader();

        const requestContext = await this.getRequestContext();
        const relativePath = this.convertToRelativePath(uri);
        return await requestContext.post(relativePath, { headers: { ...defaultHeaders, ...headers }, multipart: formData });
    }

    public async put(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = {
            ...this.getAuthHeader(),
            ...{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };

        const requestContext = await this.getRequestContext();
        const relativePath = this.convertToRelativePath(uri);
        return await requestContext.put(relativePath, { headers: { ...defaultHeaders, ...headers }, data: body });
    }

    public async delete(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = {
            ...this.getAuthHeader(),
            ...{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };

        const requestContext = await this.getRequestContext();
        const relativePath = this.convertToRelativePath(uri);
        return await requestContext.delete(relativePath, { headers: { ...defaultHeaders, ...headers }, data: body });
    }

    private async getRequestContext(): Promise<APIRequestContext> {
        if (!this.apiRequestContext) {
            const baseUrl = this.baseUrl;
            this.apiRequestContext = await request.newContext({ baseURL: baseUrl, ignoreHTTPSErrors: true });
        }

        return this.apiRequestContext;
    }

    private convertToRelativePath(path: string): string {
        return '.' + path;
    }

    private getAuthHeader(): Record<string, string> {
        const headers: Record<string, string> = {};

        if (this.secret.apiKey) {
            headers['x-api-key'] = this.secret.apiKey;
        } else if (this.secret.basicToken) {
            headers['Authorization'] = `Basic ${this.secret.basicToken}`;
        } else if (this.secret.jwtToken) {
            headers['Authorization'] = `Bearer ${this.secret.jwtToken}`;
        }

        return headers;
    }
}
