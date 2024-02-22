import { AuthBindings } from "@refinedev/core";
import { loginRequest, meRequest, registerRequest } from "../api/auth";
import { parseJwt } from "../utils/helpers";

export const ACCESS_TOKEN_KEY = "access_token";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      const {
        data: { access_token },
      } = await loginRequest({ email, password });

      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "Invalid email or password",
        },
      };
    }
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
    const { data: user } = await meRequest();

    if (!user) return null;

    const { id, email, roles } = user;

    return {
      id,
      email,
      roles,
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

    try {
      await registerRequest({ email, name, password });

      return {
        success: true,
        successNotification: {
          message: "Registration successful",
        },
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }
  },
};
