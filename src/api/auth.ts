import { User } from 'src/types';
import { apiInstance } from './api';

export const AuthEndpoints = {
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
};

type LoginDto = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

export const loginRequest = async ({ email, password }: LoginDto) => {
  return apiInstance.post<LoginResponse>(AuthEndpoints.login, {
    email,
    password,
  });
};

type RegisterDto = {
  email: string;
  name?: string;
  password: string;
};

type RegisterResponse = {};

export const registerRequest = async ({
  email,
  name,
  password,
}: RegisterDto) => {
  return apiInstance.post<RegisterResponse>(AuthEndpoints.register, {
    email,
    password,
    name,
  });
};

type MeResponse = User;

export const meRequest = async () => {
  return apiInstance.get<MeResponse>(AuthEndpoints.me);
};
