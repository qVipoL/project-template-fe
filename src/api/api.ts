import { axiosInstance } from '@refinedev/simple-rest';
import { ACCESS_TOKEN_KEY } from '../providers/auth-provider';
import { config } from 'src/constants/config';

export const apiInstance = axiosInstance;

// Set the base URL for the API
apiInstance.defaults.baseURL = config.BASE_URL;

// Add the access token to the request headers
apiInstance.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY,
  )}`;

  return request;
});
