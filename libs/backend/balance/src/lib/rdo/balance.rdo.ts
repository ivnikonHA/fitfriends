import { Expose } from 'class-transformer';

export class BalanceRdo {
  @Expose()
  public trainingId: string;

  @Expose()
  public quantity: number;
}
