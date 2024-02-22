import { apiRequest } from "./api";

export const AuthEndpoints = {
  login: "/auth/login",
  register: "/auth/register",
};

type LoginDto = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

export const loginRequest = async ({ email, password }: LoginDto) => {
  return apiRequest<LoginResponse>(AuthEndpoints.login, {
    method: "POST",
    body: JSON.stringify({ email, password }),
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
  return apiRequest<RegisterResponse>(AuthEndpoints.register, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};
