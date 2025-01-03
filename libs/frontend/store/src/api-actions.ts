import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Token, TokenPayload } from '@fitfriends/core';
import { APIRoute } from '@fitfriends/utils';
import { dropToken, saveToken } from '@fitfriends/services';
import { CreateUserDto, LoggedUserRdo, LoginUserDto, UpdateUserDto, UserRdo } from '@fitfriends/user';
import { BalanceRdo, IncreaseBalanceDto } from '@fitfriends/balance';
import { TrainingWithPagination } from '@fitfriends/training';

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

const updateUserAction = createAsyncThunk<UserRdo, UpdateUserDto, {extra: AxiosInstance}>(
  'user/update',
  async (dto, {extra: api}) => {
    const { data } = await api.patch<UserRdo>(`${APIRoute.User}/${dto.id}`, dto);
    return data;
  }
)

const fetchUserAction = createAsyncThunk<UserRdo, string, {extra: AxiosInstance}>(
  'user/fetch',
  async (userId, {extra: api}) => {
    const { data } = await api.get<UserRdo>(`${APIRoute.User}/${userId}`);
    return data;
  }
)

const fetchTrainingsAction = createAsyncThunk<TrainingWithPagination, string, {extra: AxiosInstance}>(
  'trainings/fetch',
  async (params, {extra: api}) => {
    const { data } = await api.get<TrainingWithPagination>(`${APIRoute.Training}${params}`);
    return data;
  }
)

const fetchUserBalanceAction = createAsyncThunk<BalanceRdo[], undefined, {extra: AxiosInstance}>(
  'balance/fetch',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<BalanceRdo[]>(APIRoute.Balance);
    return data;
  }
)

const buyTrainingAction = createAsyncThunk<BalanceRdo, IncreaseBalanceDto, {extra: AxiosInstance}>(
  'balance/increase',
  async (dto, {extra: api}) => {
    const { data } = await api.post<IncreaseBalanceDto>(`${APIRoute.Balance}`, dto);
    return data;
  }
)

export {
  buyTrainingAction,
  checkAuthAction,
  fetchUserBalanceAction,
  fetchTrainingsAction,
  fetchUserAction,
  loginAction,
  logoutAction,
  registerAction,
  updateUserAction,
};
