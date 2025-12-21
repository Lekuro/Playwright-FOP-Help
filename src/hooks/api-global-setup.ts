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

        // Зберігаємо токен та cookies у process.env та в конфігурацію apiWorld
        process.env.FOP_HELP_TOKEN = loginJsonResponse.token;
        process.env.TOKEN_EXPIRATION = loginJsonResponse.expiration;
        process.env.REFRESH_TOKEN = loginJsonResponse.refreshToken;
        apiWorld.configService.config.auth.apiToken = loginJsonResponse.token;

        // Отримуємо cookies з response headers
        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
            // Витягуємо лише ім'я=значення, без параметрів (expires, path, samesite, httponly)
            // let cookieValue = setCookieHeader
            //     .split(';')
            //     .filter((part) => {
            //         part.trim();
            //         return part.includes('X-');
            //     })
            //     .join('; ');
            // while (cookieValue.includes(' httponly')) {
            //     cookieValue = cookieValue.replace(' httponly, ', '');
            // }
            // cookieValue = cookieValue.replace(' samesite=strict, ', '');
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

        // Виводимо всі збережені дані
        // console.log('\n📦 Збережені в process.env:');
        // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        // console.log('🔑 AUTH_TOKEN:', process.env.AUTH_TOKEN?.substring(0, 30) + '...');
        // console.log('⏰ AUTH_EXPIRATION:', process.env.AUTH_EXPIRATION);
        // console.log('🔄 REFRESH_TOKEN:', process.env.REFRESH_TOKEN?.substring(0, 30) + '...');
        // console.log('🍪 COOKIES:', process.env.COOKIES ? 'Наявні' : 'Відсутні');
        // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('✨ Глобальний хук завершено');
    } catch (error) {
        console.error('❌ Помилка в глобальному хуку:', error);
        throw error;
    }
}
export { apiWorld };
