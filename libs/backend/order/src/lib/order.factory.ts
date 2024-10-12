import { EntityFactory, Order } from '@fitfriends/core';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

export class OrderFactory implements EntityFactory<OrderEntity> {
  public create(entityPlainData: Order): OrderEntity {
      return new OrderEntity(entityPlainData);
  }

  public createFromDto(dto: CreateOrderDto, trainingId: string, userId: string): OrderEntity {
    const currentDate = new Date();

    return new OrderEntity({
      ...dto,
      trainingId,
      userId,
      createdAt: currentDate
    });
  }
}
