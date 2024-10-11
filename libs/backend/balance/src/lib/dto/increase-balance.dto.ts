import { IsInt, IsUUID } from 'class-validator';
import { BalanceValidationMessages } from '../balance.const';

export class IncreaseBalanceDto {
  @IsUUID(undefined, { message: BalanceValidationMessages.TrainingIdWrongType})
  public trainingId: string;

  @IsInt({message: BalanceValidationMessages.QuantityWrongType})
  public quantity: number;
}
