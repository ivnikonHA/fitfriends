import { Expose } from 'class-transformer';

import { Level, TrainingType, Time, Sex, Review } from '@fitfriends/core';

export class TrainingRdo {
  @Expose()
  public id?: string;

  @Expose()
  public name: string;

  @Expose()
  public picture: string;

  @Expose()
  public level: Level;

  @Expose()
  public trainingType: TrainingType;

  @Expose()
  public trainingTime: Time;

  @Expose()
  public price: number;

  @Expose()
  public calories: number;

  @Expose()
  public description: string;

  @Expose()
  public sex: Sex;

  @Expose()
  public video: string;

  @Expose()
  public rating: number;

  @Expose()
  public trainer: string;

  @Expose()
  public special: boolean;

  @Expose()
  public reviews: Review[];

}
