import path from 'path';
import fs from 'fs';
import { AuthDto, ConfigDto } from '../models/config.dto';
import 'dotenv/config';

export class ConfigService {
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
        return this._config as ConfigDto;
    }

    private readAuthConfig(): void {
        const authConfig: AuthDto = {
            login: process.env.FOP_HELP_EMAIL as string,
            password: process.env.FOP_HELP_PASSWORD as string,
            apiToken: Buffer.from(`${process.env.FOP_HELP_EMAIL}:${process.env.FOP_HELP_PASSWORD}`).toString('base64')
        };
        this._config = { ...this._config, ...{ auth: authConfig } } as ConfigDto;
        // console.log('Auth config loaded', this._config, authConfig);
    }

    private readFileConfig(): void {
        const filePath = path.resolve(__dirname, '../config/fop-help.config.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        this._config = { ...this._config, ...JSON.parse(fileContent) } as ConfigDto;
    }
}
