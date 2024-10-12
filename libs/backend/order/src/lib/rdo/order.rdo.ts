import { Expose } from 'class-transformer';

import { Payment } from '@fitfriends/core';

export class OrderRdo {
  @Expose()
  public trainingId: string;

  @Expose()
  public price: number;

  @Expose()
  public quantity: number;

  @Expose()
  public payment: Payment;

  @Expose()
  public createdAt: Date;
}
