import { ArrayMaxSize, IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { Sex, Level, Location, TrainingType, Time } from '@fitfriends/core';
import { CaloriesNumber, DescriptionLength, NameLength, PasswordLength, TRAINING_TYPES_ARRAY_LENGTH, UserValidationMessage } from '../user.constant';

export class CreateUserDto {
  @IsString({ message: UserValidationMessage.NameWrongType})
  @Length(NameLength.Min, NameLength.Max, { message: UserValidationMessage.NameWrongLength})
  public name: string;

  @IsString({ message: UserValidationMessage.PasswordWrongType })
  @Length(PasswordLength.Min, PasswordLength.Max, { message: UserValidationMessage.PasswordWrongLength })
  public password: string;

  @IsEmail({}, { message: UserValidationMessage.EmailWrongType })
  public email: string;

  @IsString({ message: UserValidationMessage.AvatarWrongType })
  public avatar: string;

  @IsEnum(Sex, { message: UserValidationMessage.SexWrongType })
  public sex: Sex;

  @IsOptional()
  @IsDate({ message: UserValidationMessage.DateOfBirthWrongType })
  public dateOfBirth: Date;

  @IsString({ message: UserValidationMessage.DescriptionWrongType })
  @Length(DescriptionLength.Min, DescriptionLength.Max, { message: UserValidationMessage.DescriptionWrongLength })
  public description: string;

  @IsEnum(Location, { message: UserValidationMessage.LocationWrongType })
  public location: Location;

  @IsOptional()
  @IsString({ message: UserValidationMessage.PictureWrongType })
  public picture: string;

  @IsEnum(Level, { message: UserValidationMessage.LevelWrongType })
  public level: Level;

  @IsArray()
  @ArrayMaxSize(TRAINING_TYPES_ARRAY_LENGTH, { message: UserValidationMessage.TrainingTypeWrongLength })
  @IsEnum(TrainingType, { each: true, message: UserValidationMessage.TrainingTypeWrongType })
  public trainingTypes: TrainingType[];

  @IsEnum(Time, { message: UserValidationMessage.TrainingTimeWrongType })
  public trainingTime: Time;

  @IsInt({ message: UserValidationMessage.CaloriesWrongType })
  @Min(CaloriesNumber.Min, { message: UserValidationMessage.CaloriesNumber })
  @Max(CaloriesNumber.Max, { message: UserValidationMessage.CaloriesNumber })
  public caloriesAll: number;

  @IsInt({ message: UserValidationMessage.CaloriesPerDay })
  @Min(CaloriesNumber.Min, { message: UserValidationMessage.CaloriesNumber })
  @Max(CaloriesNumber.Max, { message: UserValidationMessage.CaloriesNumber })
  public caloriesPerDay: number;

  @IsBoolean({ message: UserValidationMessage.ReadyWrongType })
  public ready: boolean;

}
