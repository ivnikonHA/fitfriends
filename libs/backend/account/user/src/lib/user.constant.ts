export const NameLength = {
  Min: 1,
  Max: 15
}
export const PasswordLength = {
  Min: 6,
  Max: 12
}
export const DescriptionLength = {
  Min: 10,
  Max: 140
}
export const TRAINING_TYPES_ARRAY_LENGTH = 3;
export const CaloriesNumber = {
  Min: 1000,
  Max: 5000
}

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
  ReadyWrongType: 'Ready must be boolean'
}

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
