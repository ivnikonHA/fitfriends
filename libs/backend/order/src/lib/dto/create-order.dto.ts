import { Payment } from '@fitfriends/core';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { OrderQuantity, OrderValidationMessage } from '../order.contant';

export class CreateOrderDto {
  @IsOptional()
  @IsString({message: OrderValidationMessage.TypeOfOrderWrongType})
  public typeOfOrder: string;

  @IsUUID(undefined, {message: OrderValidationMessage.TrainingIdWrongType})
  public trainingId: string;

  @IsInt({message: OrderValidationMessage.PriceWrongType})
  public price: number;

  @IsInt({message: OrderValidationMessage.QuantityWrongType})
  @Min(OrderQuantity.Min, {message: OrderValidationMessage.QuantityWrongNumber})
  @Max(OrderQuantity.Max, {message: OrderValidationMessage.QuantityWrongNumber})
  public quantity: number;

  @IsEnum(Payment, {message: OrderValidationMessage.PaymentWrongType})
  public payment: Payment;
}
