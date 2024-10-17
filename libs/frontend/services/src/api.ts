import axios, { AxiosInstance } from 'axios';

import { getToken, saveToken } from './token';
import { APIRoute, BACKEND_URL, REQUEST_TIMEOUT, TOKEN_HEADER } from '@fitfriends/utils';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config) => {
      const { accessToken } = getToken();
      if (accessToken && config.headers) {
        config.headers[TOKEN_HEADER] = `Bearer ${accessToken}`;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { refreshToken } = getToken();
      if(error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(`${BACKEND_URL}/${APIRoute.Refresh}`, { refreshToken });
          const token = response.data;
          saveToken(token);
          originalRequest.headers[TOKEN_HEADER] = `Bearer ${token.accessToken}`;
          console.log(originalRequest)
          return api(originalRequest);
        } catch(error) {
          throw new Error(error.message);
        }
      }
      return Promise.reject(error);
    }
  )

  return api;
};
