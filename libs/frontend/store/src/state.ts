import { ReactEventHandler } from 'react';

import { AuthorizationStatus, RequestStatus } from '@fitfriends/utils';
import { store } from './store';
import { LoggedUserRdo, UserRdo } from '@fitfriends/user';
import { FilterType, Training } from '@fitfriends/core';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: LoggedUserRdo;
  userInfo: UserRdo;
}

export type TrainingsState = {
  trainings: Training[];
  status: RequestStatus;
  filter: FilterType;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;
