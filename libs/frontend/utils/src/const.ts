export const enum AppRoute {
  Intro = '/',
  Main = '/main',
  Login = '/login',
  Register = '/register',
  Interview = '/interview'
}

export const enum APIRoute {
  Login = '/user/login',
  Logout = '/user/logout',
  Register = 'user/register',
  Refresh = 'user/refresh',
  Update = '/user',
  Upload = 'files/upload'
}

export const enum NameSpace {
  Trainings = 'TRAININGS',
  User = 'USER',
  Order = 'ORDER',
  Balance = 'BALANCE',
  Review = 'REVIEW'
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN'
}

export const BACKEND_URL = "http://localhost:3001/api";
export const UPLOAD_PATH = "/upload/";
export const REQUEST_TIMEOUT = 5000;
export const TOKEN_HEADER = "authorization";
