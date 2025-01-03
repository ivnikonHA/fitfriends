import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, DEFAULT_TRAINING_COUNT_LIMIT } from '../consts/trainings.const';
import { SortDirection } from './sort-direction.interface';

export class TrainingQuery {
  @Transform(({value}) => +value || DEFAULT_TRAINING_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number = DEFAULT_TRAINING_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
