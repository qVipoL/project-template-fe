import { AccessControlProvider } from "@refinedev/core";
import { ACCESS_TOKEN_KEY } from "./auth-provider";
import { parseJwt } from "../utils/helpers";

const userResources: string[] = [];

export const accessControlProvider: AccessControlProvider = {
  // checks if the user can has access to a resource
  can: async ({ resource }) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return {
        can: false,
      };
    }

    const { roles } = parseJwt(token);

    if (roles.includes("ADMIN")) {
      return { can: true };
    }

    if (roles.includes("USER") && resource) {
      const can = userResources.includes(resource);

      return {
        can,
        reason: can ? "" : "Unauthorized",
      };
    }

    return {
      can: false,
      reason: "Unauthorized",
    };
  },
};
