import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace } from '@fitfriends/utils';
import { UserState } from '../state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { dropToken } from '@fitfriends/services';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    id: '',
    email: '',
    accessToken: '',
    refreshToken: ''
  }
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        dropToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
  },
});

