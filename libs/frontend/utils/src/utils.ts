import { FilterType, Level, OrderBy, Sex, Time } from '@fitfriends/core';
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
  return `/?limit=${visibleItems}&sortDirection=${filter.sorting}&orderBy=${OrderBy.PRICE}`
}

export function createParamsString({limit, sortDirection, orderBy, page, where}: TrainingQuery) {
  return `/?limit=${limit}&sortDirection=${sortDirection}&orderBy=${orderBy}&page=${page}&where=${where}`;
}
