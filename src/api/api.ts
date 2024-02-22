import { axiosInstance } from "@refinedev/simple-rest";
import { ACCESS_TOKEN_KEY } from "../providers/auth-provider";

export const BASE_URL = "http://localhost:3000";

export const apiInstance = axiosInstance;

apiInstance.defaults.baseURL = BASE_URL;

apiInstance.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY
  )}`;

  return request;
});
