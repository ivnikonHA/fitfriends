import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { Rate, ReviewValidationMessage, TextLength } from '../review.constant';

export class CreateReviewDto {
  @IsInt({message:ReviewValidationMessage.RateWrongType})
  @Min(Rate.Min, {message: ReviewValidationMessage.RateWrongNumber})
  @Max(Rate.Max, {message: ReviewValidationMessage.RateWrongNumber})
  public rate: number;

  @IsString({message: ReviewValidationMessage.TextWrongType})
  @Length(TextLength.Min, TextLength.Max, {message: ReviewValidationMessage.TextWrongLength})
  public text: string;
}
