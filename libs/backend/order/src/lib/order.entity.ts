import { Entity, Order, Payment, StorableEntity } from '@fitfriends/core';

export class OrderEntity extends Entity implements StorableEntity<Order> {
  public userId: string;
  public typeOfOrder: string;
  public trainingId: string;
  public price: number;
  public quantity: number;
  public payment: Payment;
  public createdAt: Date;

  constructor(order?: Order) {
    super();
    this.populate(order);
  }

  private populate(order: Order) {
    if(!order) {
      return;
    }
     this.id = order.id ?? undefined;
     this.userId = order.userId;
     this.typeOfOrder = order.typeOfOrder;
     this.trainingId = order.trainingId;
     this.price = order.price;
     this.quantity = order.quantity;
     this.payment = order.payment;
     this.createdAt = order.createdAt;
  }

  public toPOJO(): Order {
    return {
      id: this.id,
      userId: this.userId,
      typeOfOrder: this.typeOfOrder,
      trainingId: this.trainingId,
      price: this.price,
      quantity: this.quantity,
      payment: this.payment,
      createdAt: this.createdAt,
    }
  }
}
