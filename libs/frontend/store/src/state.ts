import { ReactEventHandler } from 'react';

import { AuthorizationStatus } from '@fitfriends/utils';
import { store } from './store';
import { LoggedUserRdo } from '@fitfriends/user';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: LoggedUserRdo;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;
