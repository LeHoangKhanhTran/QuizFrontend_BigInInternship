import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { store } from "./stores/store";
import type { User } from "./types";

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5075',
  timeout: 4500,
  headers: {
    "Content-Type": "application/json",
  },
});

const noRefreshUrl = ["/api/auth/refresh-token", "/api/auth/login"];
api.interceptors.response.use((res) => res,
async(err: AxiosError) => {
  const request = err.config as AxiosRequestConfig;
  if (((err.response?.status === 401 && request.url && !noRefreshUrl.includes(request.url) || request.url === '/api/users/me'))) {
    try {
      const response = await api.post('/api/auth/refresh-token');
      if (response.status === 200) {
        store.userLoading = true;
        const userResponse = await api.get('/api/users/me');
        if (userResponse.status === 200) {
          store.setUser(userResponse.data as User);
          return api(request as AxiosRequestConfig)
        }
      }
    }
    catch(error) {
      const axiosError = error as AxiosError;
      return Promise.reject(axiosError);
    }
    finally {
      store.userLoading = false;
    }
  }
  return Promise.reject(err);
} 
)
