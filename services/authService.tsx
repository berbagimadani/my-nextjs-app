import { fetchAPI } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../utils/apiEndpoints';

interface LoginCredentials {
  email: string;
  password?: string; 
  // Add other required fields
}

export const login = async (credentials: LoginCredentials) => {
  return await fetchAPI(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const logout = async () => {
  return await fetchAPI(API_ENDPOINTS.LOGOUT, { method: 'POST' });
};

export const refreshToken = async () => {
  return await fetchAPI(API_ENDPOINTS.REFRESH_TOKEN, { method: 'POST' });
};