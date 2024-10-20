import { DEFAULT_TRAINING_COUNT_LIMIT, FilterType, Level, Sex, Time } from '@fitfriends/core';

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

export function getParamsString(filter: FilterType): string {
  return `/?limit=${DEFAULT_TRAINING_COUNT_LIMIT}&sortDirection=${filter.sorting}&`
}
