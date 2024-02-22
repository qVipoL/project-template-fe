import { AuthBindings } from "@refinedev/core";
import { loginRequest, registerRequest } from "../api/auth";
import { parseJwt } from "../utils/helpers";

export const ACCESS_TOKEN_KEY = "access_token";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const response = await loginRequest({ email, password });

    if (!response) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "Invalid email or password",
        },
      };
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);

    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) return null;

    const { sub, email, roles } = parseJwt(token);

    return {
      id: sub,
      email: email,
      roles,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  register: async ({ email, name, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "Invalid email or password",
        },
      };
    }

    const res = await registerRequest({ email, name, password });

    if (!res) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    return {
      success: true,
      successNotification: {
        message: "Registration successful",
      },
      redirectTo: "/login",
    };
  },
};
