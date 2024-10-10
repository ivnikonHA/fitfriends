export const Rate = {
  Min: 1,
  Max: 5
}
export const TextLength = {
  Min: 100,
  Max: 1024
}

export const ReviewValidationMessage = {
  UserIdWrongType: 'UserIs must be UUID',
  TrainigIdWrongType: 'TrainingId must be UUID',
  RateWrongType: 'Rate must be a number',
  RateWrongNumber: `Rate must be from ${Rate.Min} to ${Rate.Max}`,
  TextWrongType: 'Text must be a string',
  TextWrongLength: `Text length must be from ${TextLength.Min} to ${TextLength.Max}`
}
