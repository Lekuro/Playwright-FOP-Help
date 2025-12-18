// import * as dotenv from 'dotenv-safe';
// import { ApiConfigDto, AuthConfigDto, ConfigDto } from '../models/config/api.config';
// import * as fs from 'fs';

// export class ConfigService {
//     private _token: string;

//     public constructor() {
//         dotenv.config();
//         this._token = '';
//     }

//     public getConfig(): ConfigDto {
//         const authConfig = this.getAuthConfig();
//         const apiConfig = this.getApiConfig();

//         return {
//             auth: authConfig,
//             api: apiConfig
//         };
//     }

//     public updateJwtToken(token: string): void {
//         fs.writeFileSync('token.txt', token);
//         this._token = token;
//     }

//     private getAuthConfig(): AuthConfigDto {
//         if (fs.existsSync('token.txt')) {
//             this._token = fs.readFileSync('token.txt', 'utf8');
//         }

//         return {
//             theDogsApi: {
//                 apiKey: process.env.DOG_API_KEY ? process.env.DOG_API_KEY : ''
//             },
//             rdApi: {
//                 userName: process.env.RD_USER_NAME ? process.env.RD_USER_NAME : '',
//                 password: process.env.RD_PASSWORD ? process.env.RD_PASSWORD : '',
//                 token: this._token
//             }
//         };
//     }

//     private getApiConfig(): ApiConfigDto {
//         return {
//             theDogsApi: {
//                 baseUrl: 'https://api.thedogapi.com/v1'
//             },
//             // jira: {
//             //     baseUrl: 'https://levkoniuk.atlassian.net/rest/api/3'
//             // },
//             rd: {
//                 baseUrl: 'https://lms.academius.io/',
//                 loginUrl: 'https://lms.robotdreams.cc/login'
//             }
//         };
//     }
// }
