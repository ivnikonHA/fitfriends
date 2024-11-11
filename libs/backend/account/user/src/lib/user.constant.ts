import { NameLength, PasswordLength, DescriptionLength, TRAINING_TYPES_ARRAY_LENGTH, CaloriesNumber } from '@fitfriends/core';

export const UserValidationMessage = {
  NameWrongType: 'Name must be a string',
  NameWrongLength: `Name length must be from ${NameLength.Min} to ${NameLength.Max}`,
  EmailWrongType: 'Wrong email',
  AvatarWrongType: 'Avatar path must be a string',
  PasswordWrongType: 'Password must be a string',
  PasswordWrongLength: `Password length must be from ${PasswordLength.Min} to ${PasswordLength.Max}`,
  SexWrongType: 'Sex must be MALE, FEMALE or DONT_MATTER',
  DateOfBirthWrongType: 'Date of birth must be date',
  DescriptionWrongType: 'Description must be a string',
  DescriptionWrongLength: `Description length must be from ${DescriptionLength.Min} to ${DescriptionLength.Max}`,
  LocationWrongType: 'Location must be PIONERSKAYA, PETROGRADSKAYA, UDELNAYA, ZVEZDNAYA or SPORTIVNAYA',
  PictureWrongType: 'Picture must be a string',
  LevelWrongType: 'Level must be BEGGINER, AMATEUR or PRO ',
  TrainingTypeWrongType: 'Training types must be an array of YOGA, RUNNING, BOX, STRETCHING, CROSSFIT, AEROBICS or PILATES ',
  TrainingTypeWrongLength: `Trainig type array length must be ${TRAINING_TYPES_ARRAY_LENGTH} max`,
  TrainingTimeWrongType: 'Training time must be SHORT, MEDIUM, LONG or EXTRA',
  CaloriesWrongType: 'Calories must be an integer number',
  CaloriesPerDay: 'Calories per day must be an integer number',
  CaloriesNumber: `Calories must be from ${CaloriesNumber.Min} to ${CaloriesNumber.Max}`,
  RoleWrongType: 'Role must be coach or sportsman',
  ReadyWrongType: 'Ready must be boolean'
}

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  UserUpdated: 'The user data has been successfully updated.',
  RefreshToken: 'Get a new access/refresh tokens'
} as const;
