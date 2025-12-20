/**
 * Login Request DTO
 * Used for authentication endpoint: POST /api/react/authenticate/login
 */
export interface LoginRequestDto {
    username: string;
    password: string;
}

/**
 * Login Response DTO
 * Response from: POST /api/react/authenticate/login
 */
export interface LoginResponseDto {
    token: string;
    expiration: string;
    refreshToken: string;
}
