import { IsEmail, IsString, Length } from 'class-validator';

import { PasswordLength, UserValidationMessage } from '../user.constant';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.EmailWrongType})
  public email: string;

  @IsString({ message: UserValidationMessage.PasswordWrongType })
  @Length(PasswordLength.Min, PasswordLength.Max, { message: UserValidationMessage.PasswordWrongLength })
  public password: string;
}
