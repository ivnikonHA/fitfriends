import { FilterType, Training } from '@fitfriends/core';
import { State } from '../state';
import { NameSpace, RequestStatus } from '@fitfriends/utils';

const getTrainings = (state: State): Training[] => state[NameSpace.Trainings].trainings?.entities;
const getTotalPages = (state: State): number => state[NameSpace.Trainings].trainings?.totalPages;
const getTotalItems = (state: State): number => state[NameSpace.Trainings].trainings?.totalItems;
const getCurrentPage = (state: State): number => state[NameSpace.Trainings].trainings?.currentPage;
const getItemsPerPage = (state: State): number => state[NameSpace.Trainings].trainings?.itemsPerPage;
const getTrainingsLoadingStatus = (state: State): RequestStatus => state[NameSpace.Trainings].status;
const getFilter = (state: State): FilterType => state[NameSpace.Trainings].filter;

export {
  getTrainings,
  getCurrentPage,
  getItemsPerPage,
  getTotalItems,
  getTotalPages,
  getTrainingsLoadingStatus,
  getFilter
};
