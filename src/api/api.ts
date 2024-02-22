import { ACCESS_TOKEN_KEY } from "../providers/auth-provider";

export const BASE_URL = "http://localhost:3000";

export const apiRequest = async <T extends any>(
  path: string,
  options: RequestInit
): Promise<T | null> => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) return null;

  return res.json();
};
