import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Token, TokenPayload } from '@fitfriends/core';
import { APIRoute } from '@fitfriends/utils';
import { dropToken, saveToken } from '@fitfriends/services';
import { CreateUserDto, LoggedUserRdo, LoginUserDto } from '@fitfriends/user';

const checkAuthAction = createAsyncThunk<
  LoggedUserRdo,
  undefined,
  {extra: AxiosInstance}
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<LoggedUserRdo>(APIRoute.Login);
  return data;
});

const loginAction = createAsyncThunk<LoggedUserRdo, LoginUserDto, {extra: AxiosInstance}>(
  'user/login',
  async ( dto, { extra: api }) => {
    const { data } = await api.post<LoggedUserRdo>(APIRoute.Login, dto);
    const token: Token = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };
    saveToken(token);
    return data;
  }
);

const logoutAction = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout).then(dropToken);
  }
);

const registerAction = createAsyncThunk<TokenPayload, CreateUserDto, {extra: AxiosInstance}>(
  'user/register',
  async (dto, {extra: api}) => {
    const { data } = await api.post<TokenPayload>(APIRoute.Register, dto);
    return data
  }
);

export {
  checkAuthAction,
  loginAction,
  logoutAction,
  registerAction
};
