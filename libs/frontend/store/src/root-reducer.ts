import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '@fitfriends/utils';
import { userSlice } from './user/user-slice';
import { trainingsSlice } from './trainings/trainings-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Trainings]: trainingsSlice.reducer
});
