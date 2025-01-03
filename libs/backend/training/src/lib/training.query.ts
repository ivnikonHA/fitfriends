import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, DEFAULT_TRAINING_COUNT_LIMIT } from './training.const';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { OrderBy, SortDirection } from '@fitfriends/core';

export class TrainingQuery {
  @Transform(({value}) => +value || DEFAULT_TRAINING_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number = DEFAULT_TRAINING_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @IsIn(Object.values(OrderBy))
  @IsOptional()
  public orderBy?: OrderBy;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @Transform(({value}) => +value )
  @IsNumber()
  @IsOptional()
  public priceMin?: number;

  @Transform(({value}) => +value )
  @IsNumber()
  @IsOptional()
  public priceMax?: number;

}
