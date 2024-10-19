import { IsEmail, IsString, Length } from 'class-validator';

import { UserValidationMessage } from '../user.constant';
import { PasswordLength } from '@fitfriends/core';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.EmailWrongType})
  public email: string;

  @IsString({ message: UserValidationMessage.PasswordWrongType })
  @Length(PasswordLength.Min, PasswordLength.Max, { message: UserValidationMessage.PasswordWrongLength })
  public password: string;
}
