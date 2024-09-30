import { Expose } from 'class-transformer';
import { TrainingRdo } from './training.rdo';

export class TrainingWithPagination {
  @Expose()
  public entities: TrainingRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
