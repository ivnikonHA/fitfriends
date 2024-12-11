import { SortDirection } from './sort-direction.interface';
import { TrainingType } from './training-type.interface';

export interface FilterType {
  sortDirection: SortDirection;
  priceMin: number;
  priceMax: number;
  caloriesMin: number;
  caloriesMax: number;
  ratingMin: number;
  ratingMax: number;
  types: TrainingType[];
}
