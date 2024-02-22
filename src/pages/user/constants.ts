export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type User = {
  email: string;
  name: string;
  password: string;
  roles: string[];
  id: string;
};
