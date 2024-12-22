import { Entity } from '../base/entity';

export interface PaginationResult<T extends Entity> {
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  minCalories: number;
  maxCalories: number;
  minPrice: number;
  maxPrice: number;
}
