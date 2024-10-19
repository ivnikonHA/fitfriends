import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import {
  Sex,
  Level,
  Location,
  TrainingType,
  Time,
  Role,
  CaloriesNumber,
  DescriptionLength,
  NameLength,
  TRAINING_TYPES_ARRAY_LENGTH
} from '@fitfriends/core';
import { UserValidationMessage } from '../user.constant';

export class UpdateUserDto {
  public id?: string;

  @IsOptional()
  @IsString({ message: UserValidationMessage.NameWrongType})
  @Length(NameLength.Min, NameLength.Max, { message: UserValidationMessage.NameWrongLength})
  public name?: string;

  @IsOptional()
  @IsString({ message: UserValidationMessage.AvatarWrongType })
  public avatar?: string;

  @IsOptional()
  @IsEnum(Sex, { message: UserValidationMessage.SexWrongType })
  public sex?: Sex;

  @IsOptional()
  @IsDate({ message: UserValidationMessage.DateOfBirthWrongType })
  public dateOfBirth?: Date;

  @IsOptional()
  @IsString({ message: UserValidationMessage.DescriptionWrongType })
  @Length(DescriptionLength.Min, DescriptionLength.Max, { message: UserValidationMessage.DescriptionWrongLength })
  public description?: string;

  @IsOptional()
  @IsEnum(Location, { message: UserValidationMessage.LocationWrongType })
  public location?: Location;


  @IsOptional()
  @IsString({ message: UserValidationMessage.PictureWrongType })
  public picture?: string;

  @IsOptional()
  @IsEnum(Level, { message: UserValidationMessage.LevelWrongType })
  public level?: Level;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(TRAINING_TYPES_ARRAY_LENGTH, { message: UserValidationMessage.TrainingTypeWrongLength })
  @IsEnum(TrainingType, { each: true, message: UserValidationMessage.TrainingTypeWrongType })
  public trainingTypes?: TrainingType[];

  @IsOptional()
  @IsEnum(Time, { message: UserValidationMessage.TrainingTimeWrongType })
  public trainingTime?: Time;

  @IsOptional()
  @IsInt({ message: UserValidationMessage.CaloriesWrongType })
  @Min(CaloriesNumber.Min, { message: UserValidationMessage.CaloriesNumber })
  @Max(CaloriesNumber.Max, { message: UserValidationMessage.CaloriesNumber })
  public caloriesAll?: number;

  @IsOptional()
  @IsInt({ message: UserValidationMessage.CaloriesPerDay })
  @Min(CaloriesNumber.Min, { message: UserValidationMessage.CaloriesNumber })
  @Max(CaloriesNumber.Max, { message: UserValidationMessage.CaloriesNumber })
  public caloriesPerDay?: number;

  @IsOptional()
  @IsEnum(Role, { message: UserValidationMessage.ReadyWrongType })
  public role?: Role;
}
