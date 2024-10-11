import { Balance, Entity, StorableEntity } from '@fitfriends/core';

export class BalanceEntity extends Entity implements StorableEntity<Balance> {
  public userId: string;
  public trainingId: string;
  public quantity: number;

  constructor(balance?: Balance) {
    super();
    this.populate(balance);
  }

  public populate(balance?: Balance) {
    if(!balance) {
      return;
    }

    this.id = balance.id ?? undefined;
    this.userId = balance.userId;
    this.trainingId = balance.trainingId;
    this.quantity = balance.quantity;
  }

  public toPOJO(): Balance {
      return {
        id: this.id,
        userId: this.userId,
        trainingId: this.trainingId,
        quantity: this.quantity
      }
  }
}
