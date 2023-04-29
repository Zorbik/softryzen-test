export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  tokens: Tokens;
}
