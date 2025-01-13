// Replace with your actual environment variable name (if different)
const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_BASE_URL = NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';

export interface ApiEndpoint {
  [key: string]: string;
}

export const API_ENDPOINTS: ApiEndpoint = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  GET_USER: `${API_BASE_URL}/protected/user`,
  GET_CHART_DATA: `${API_BASE_URL}/charts/data`,
};