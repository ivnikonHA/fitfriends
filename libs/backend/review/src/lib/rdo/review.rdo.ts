import { Expose } from 'class-transformer';

export class ReviewRdo {
  @Expose()
  public userId: string;

  @Expose()
  public trainingId: string;

  @Expose()
  public rate: number;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: Date;
}
