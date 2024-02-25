import { AuthBindings } from "@refinedev/core";
import { loginRequest, meRequest, registerRequest } from "../api/auth";

export const ACCESS_TOKEN_KEY = "access_token";

export const authProvider: AuthBindings = {
  // executes on login
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
  // executes on logout
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  // executes on register
  register: async ({ email, name, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "Passwords do not match",
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
  // checks if user is authenticated
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
  // gets user identityfrom the server
  getIdentity: async () => {
    const { data: user } = await meRequest();

    if (!user) return null;

    const { id, email, roles, avatar } = user;

    return {
      id,
      email,
      roles,
      avatar,
    };
  },
  // executes on error
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
