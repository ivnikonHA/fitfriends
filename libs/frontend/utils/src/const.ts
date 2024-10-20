export const enum AppRoute {
  Intro = '/',
  Main = '/main',
  Login = '/login',
  Register = '/register',
  Interview = '/interview',
  Account = '/account',
  Trainings = '/trainings'
}

export const enum APIRoute {
  Login = '/user/login',
  Logout = '/user/logout',
  Register = 'user/register',
  Refresh = 'user/refresh',
  User = '/user',
  Upload = 'files/upload',
  Training = '/training'
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

export const enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed'
}

export const BACKEND_URL = "http://localhost:3001/api";
export const UPLOAD_PATH = "/upload/";
export const REQUEST_TIMEOUT = 5000;
export const TOKEN_HEADER = "authorization";
