/**
 * Login Request DTO
 * Used for authentication endpoint: POST /api/react/authenticate/login
 */
export interface ILoginRequestDto {
    username: string;
    password: string;
}

/**
 * Login Response DTO
 * Response from: POST /api/react/authenticate/login
 */
export interface ILoginResponseDto {
    token: string;
    expiration: string;
    refreshToken: string;
}
