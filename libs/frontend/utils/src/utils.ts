import { DEFAULT_TRAINING_COUNT_LIMIT, FilterType, Level, Sex, Time } from '@fitfriends/core';
import { TrainingQuery } from '@fitfriends/training';

export function getDefaultInterviewResult(sex: Sex) {
  return {
    level: Level.AMATEUR,
    trainingTypes: [],
    trainingTime: Time.MEDIUM,
    caloriesAll: 5000,
    caloriesPerDay: sex === Sex.MALE ? 3300: 2300,
    description: 'qwertyuiop'
  }
}

export function getParamsString(filter: FilterType, page: number): string {
  const query = new URLSearchParams(filter as unknown as Record<string, string>).toString();
  return `/?limit=${DEFAULT_TRAINING_COUNT_LIMIT}&${query}&orderBy=price&page=${page}`;
}

export function createParamsString({limit, sortDirection, orderBy, page}: TrainingQuery) {
  return `/?limit=${limit}&sortDirection=${sortDirection}&orderBy=${orderBy}&page=${page}`;
}
