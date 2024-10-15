export const enum AppRoute {
  Intro = '/',
  Main = '/main',
  Login = '/login',
  Register = '/register'
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH'
}

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const UPLOAD_PATH = import.meta.env.VITE_UPLOAD_PATH;
export const REQUEST_TIMEOUT = import.meta.env.VITE_REQUEST_TIMEOUT;
export const TOKEN_HEADER = import.meta.env.VITE_TOKEN_HEADER;
