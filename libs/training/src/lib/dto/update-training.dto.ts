import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';

import { Level, Sex, Time, TrainingType} from '@fitfriends/core';

export class CreateTrainingDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public picture: string;

  @IsEnum(Level)
  @IsOptional()
  public level: Level;

  @IsEnum(TrainingType)
  @IsOptional()
  public trainingType: TrainingType;

  @IsEnum(Time)
  @IsOptional()
  public trainingTime: Time;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsNumber()
  @IsOptional()
  public calories: number;

  @IsString()
  @IsOptional()
  public description: string;

  @IsEnum(Sex)
  @IsOptional()
  public sex: Sex;

  @IsString()
  @IsOptional()
  public video: string;

  @IsNumber()
  @IsOptional()
  public rating: number;

  @IsString()
  @IsOptional()
  public trainer: string;

  @IsBoolean()
  @IsOptional()
  public special: boolean;
}
