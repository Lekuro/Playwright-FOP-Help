import { ApiWorld } from '../api-world';
import { ILoginRequestDto } from '../models/api-models/login.dto';

const apiWorld = new ApiWorld();

export default async function globalSetup(): Promise<void> {
    console.log('🚀 Запуск глобального хука');
    try {
        const loginData: ILoginRequestDto = {
            username: apiWorld.configService.config.auth.apiEmail,
            password: apiWorld.configService.config.auth.password
        };
        console.log('🔐 Спроба логіну...');
        const [response, loginJsonResponse] = await apiWorld.loginApi.login(loginData);

        if (!response.ok) {
            throw new Error(`Помилка логіну: ${response.status} ${response.statusText}`);
        }
        console.log('✅ Логін успішний!');
        // console.log('🔑 Токен отримано:', loginJsonResponse.token);
        process.env.FOP_HELP_TOKEN = loginJsonResponse.token;
        process.env.TOKEN_EXPIRATION = loginJsonResponse.expiration;
        process.env.REFRESH_TOKEN = loginJsonResponse.refreshToken;
        apiWorld.configService.config.auth.apiToken = loginJsonResponse.token;

        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
            let setCookieHeaders = setCookieHeader;
            const cookiesArray = [];
            while (setCookieHeaders.includes('X-')) {
                const startIndex = setCookieHeaders.indexOf('X-');
                const endIndex = setCookieHeaders.indexOf(';', startIndex);
                const cookie = endIndex !== -1 ? setCookieHeaders.substring(startIndex, endIndex) : setCookieHeader.substring(startIndex);
                cookiesArray.push(cookie.trim());
                setCookieHeaders = setCookieHeaders.substring(endIndex + 1);
            }
            const cookieValue = cookiesArray.join('; ');
            process.env.API_COOKIES = cookieValue;
            apiWorld.configService.config.auth.apiCookies = cookieValue;
            // console.log('🍪 Cookies збережено:', cookieValue);
        }
        console.log('✨ Глобальний хук завершено');
    } catch (error) {
        console.error('❌ Помилка в глобальному хуку:', error);
        throw error;
    }
}
export { apiWorld };

export const uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
