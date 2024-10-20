import { Token } from '@fitfriends/core';

const AUTH_TOKEN_KEY_NAME = 'fitfiends-token';
const REFRESH_TOKEN_KEY_NAME = 'fitfriends-refresh-token';

const getToken = (): Token => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return {accessToken, refreshToken};
};

const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token.refreshToken);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

export { dropToken, getToken, saveToken };
