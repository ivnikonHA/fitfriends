import { IsBoolean, IsEnum, IsNumber, IsString} from 'class-validator';

import { Level, Sex, Time, TrainingType} from '@fitfriends/core';

export class CreateTrainingDto {
  @IsString()
  public name: string;

  @IsString()
  public picture: string;

  @IsEnum(Level)
  public level: Level;

  @IsEnum(TrainingType)
  public trainingType: TrainingType;

  @IsEnum(Time)
  public trainingTime: Time;

  @IsNumber()
  public price: number;

  @IsNumber()
  public calories: number;

  @IsString()
  public description: string;

  @IsEnum(Sex)
  public sex: Sex;

  @IsString()
  public video: string;

  @IsNumber()
  public rating: number;

  @IsString()
  public trainer: string;

  @IsBoolean()
  public special: boolean;
}
