import { FilterType, Training } from '@fitfriends/core';
import { State } from '../state';
import { NameSpace, RequestStatus } from '@fitfriends/utils';

const getTrainings = (state: State): Training[] => state[NameSpace.Trainings].trainings;
const getTrainingsLoadingStatus = (state: State): RequestStatus => state[NameSpace.Trainings].status;
const getFilter = (state: State): FilterType => state[NameSpace.Trainings].filter;

export { getTrainings, getTrainingsLoadingStatus, getFilter };
