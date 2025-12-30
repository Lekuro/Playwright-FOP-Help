import path from 'path';
import fs from 'fs';
import { AuthDto, ConfigDto } from '../models/config.dto';
import 'dotenv/config';

export class ConfigService {
    private static iterator = 0;
    public get config(): ConfigDto {
        return this._config ?? this.initConfig();
    }
    private _config: ConfigDto | undefined;

    public constructor() {
        this.initConfig();
    }

    private initConfig(): ConfigDto {
        this.readFileConfig();
        this.readAuthConfig();
        ConfigService.iterator++;
        // console.log(`ConfigService initialized ${ConfigService.iterator} time(s)`);
        return this._config as ConfigDto;
    }

    private readAuthConfig(): void {
        const authConfig: AuthDto = {
            uiEmail: process.env.FOP_HELP_UI_EMAIL as string,
            apiEmail: process.env.FOP_HELP_API_EMAIL as string,
            password: process.env.FOP_HELP_PASSWORD as string,
            apiToken: process.env.FOP_HELP_TOKEN as string,
            apiCookies: process.env.API_COOKIES as string,
            uiCookies: process.env.PLAYWRIGHT_COOKIES as string
        };
        this._config = { ...this._config, ...{ auth: authConfig } } as ConfigDto;
    }

    private readFileConfig(): void {
        const filePath = path.resolve(__dirname, '../config/fop-help.config.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        this._config = { ...this._config, ...JSON.parse(fileContent) } as ConfigDto;
    }
}
