import { ApiWorld } from '../api-world';
import { LoginRequestDto } from '../models/api-models/login.dto';

const apiWorld = new ApiWorld();

export default async function globalSetup(): Promise<void> {
    console.log('🚀 Запуск глобального хука');

    try {
        const loginData: LoginRequestDto = {
            username: apiWorld.configService.config.auth.login,
            password: apiWorld.configService.config.auth.password
        };

        console.log('🔐 Спроба логіну...');

        const [response, loginJsonResponse] = await apiWorld.loginApi.login(loginData);

        if (!response.ok) {
            throw new Error(`Помилка логіну: ${response.status} ${response.statusText}`);
        }

        console.log('✅ Логін успішний!');
        console.log('🔑 Токен отримано:', loginJsonResponse.token);

        // Зберігаємо токен та cookies у process.env
        process.env.AUTH_TOKEN = loginJsonResponse.token;
        process.env.AUTH_EXPIRATION = loginJsonResponse.expiration;
        process.env.REFRESH_TOKEN = loginJsonResponse.refreshToken;

        // Отримуємо cookies з response headers
        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
            process.env.COOKIES = setCookieHeader;
            console.log('🍪 Cookies отримано:');
            console.log(setCookieHeader);
        }

        // Виводимо всі збережені дані
        console.log('\n📦 Збережені в process.env:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔑 AUTH_TOKEN:', process.env.AUTH_TOKEN?.substring(0, 30) + '...');
        console.log('⏰ AUTH_EXPIRATION:', process.env.AUTH_EXPIRATION);
        console.log('🔄 REFRESH_TOKEN:', process.env.REFRESH_TOKEN?.substring(0, 30) + '...');
        console.log('🍪 COOKIES:', process.env.COOKIES ? 'Наявні' : 'Відсутні');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('✨ Глобальний хук завершено');
    } catch (error) {
        console.error('❌ Помилка в глобальному хуку:', error);
        throw error;
    }
}

export { apiWorld };
