import { NameSpace, RequestStatus } from '@fitfriends/utils';
import { createSlice } from '@reduxjs/toolkit';
import { TrainingsState } from '../state';
import { fetchTrainingsAction } from '../api-actions';
import { DEFAULT_SORT_DIRECTION } from '@fitfriends/core';

const initialState: TrainingsState = {
  trainings: null,
  status: RequestStatus.Idle,
  filter: {
    sortDirection: DEFAULT_SORT_DIRECTION,
    caloriesMax: 5000,
    caloriesMin: 0,
    ratingMax: 10,
    priceMax: 10000,
    priceMin: 0,
    ratingMin: 0,
    types: []
  }
}
export const trainingsSlice = createSlice({
  name: NameSpace.Trainings,
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.trainings = action.payload.entities;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
  },
});

export const { changeFilter } = trainingsSlice.actions;
