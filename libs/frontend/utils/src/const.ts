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

export const BACKEND_URL = "http://localhost:5000";
export const UPLOAD_PATH = "/upload/";
export const REQUEST_TIMEOUT = 5000;
export const TOKEN_HEADER = "authorization";
