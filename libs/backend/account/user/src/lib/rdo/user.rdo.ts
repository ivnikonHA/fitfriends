import { Sex, Level, TrainingType, Time, Role } from '@fitfriends/core';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public sex: Sex;

  @Expose()
  public dateOfBirth: Date;

  @Expose()
  public description: string;

  @Expose()
  public location: Location;

  @Expose()
  public picture: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public level: Level;

  @Expose()
  public trainingTypes: TrainingType[];

  @Expose()
  public trainingTime: Time;

  @Expose()
  public caloriesAll: number;

  @Expose()
  public caloriesPerDay: number;

  @Expose()
  public role: Role;

}
