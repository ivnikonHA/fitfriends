import { FilterType, Level, OrderBy, Sex, SortDirection, Time } from '@fitfriends/core';
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

export function getParamsString(filter: FilterType, visibleItems: number): string {
  console.log(filter.sortDirection)
  
  const query = new URLSearchParams(filter as unknown as Record<string, string>).toString();
  console.log('filter:',filter)
  return `/?limit=${visibleItems}&${query}&orderBy=price`;
}

export function createParamsString({limit, sortDirection, orderBy, page}: TrainingQuery) {
  return `/?limit=${limit}&sortDirection=${sortDirection}&orderBy=${orderBy}&page=${page}`;
}
