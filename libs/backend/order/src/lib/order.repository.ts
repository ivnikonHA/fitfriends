import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { OrderEntity } from './order.entity';
import { Order } from '@fitfriends/core';
import { OrderFactory } from './order.factory';
import { PrismaClientService } from '@fitfriends/backend-models';

@Injectable()
export class OrderRepository extends BasePostgresRepository<OrderEntity, Order> {
  constructor(
    entityFactory: OrderFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: OrderEntity): Promise<OrderEntity> {
    const document = await this.client.order.create({
      data: { ...entity.toPOJO()}
    });
    entity.id = document.id;

    return this.createEntityFromDocument(document as Order);
  }

  public async findById(id: string): Promise<OrderEntity> {
      const document = await this.client.order.findFirst({
        where: { id }
      });

      if(!document) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      return this.createEntityFromDocument(document as Order);
  }

  public async findByUserId(userId: string): Promise<OrderEntity[]> {
    const documents = await this.client.order.findMany({
      where: { id: userId }
    });

    return documents.map(document => this.createEntityFromDocument(document as Order));
  }
}
