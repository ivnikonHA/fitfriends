import { IsInt, IsString, IsUUID, Length, Max, Min } from 'class-validator';
import { Rate, ReviewValidationMessage, TextLength } from '../review.constant';

export class CreateReviewDto {
  @IsUUID(undefined, {message: ReviewValidationMessage.UserIdWrongType})
  public userId: string;

  @IsInt({message:ReviewValidationMessage.RateWrongType})
  @Min(Rate.Min, {message: ReviewValidationMessage.RateWrongNumber})
  @Max(Rate.Max, {message: ReviewValidationMessage.RateWrongNumber})
  public rate: number;

  @IsString({message: ReviewValidationMessage.TextWrongType})
  @Length(TextLength.Min, TextLength.Max, {message: ReviewValidationMessage.TextWrongLength})
  public text: string;
}
