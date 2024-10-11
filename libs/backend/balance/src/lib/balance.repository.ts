import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { BalanceEntity } from './balance.entity';
import { Balance } from '@fitfriends/core';
import { BalanceFactory } from './balance.factory';
import { PrismaClientService } from '@fitfriends/backend-models';

@Injectable()
export class BalanceRepository extends BasePostgresRepository<BalanceEntity, Balance> {
  constructor(
    entityFactory: BalanceFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BalanceEntity): Promise<BalanceEntity> {
      const document = await this.client.balance.create({
        data: { ...entity.toPOJO() }
      });

      return this.createEntityFromDocument(document);
  }

  public async findById(id: string): Promise<BalanceEntity> {
    const document = await this.client.balance.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Balance with id ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByUserId(userId: string): Promise<BalanceEntity[]> {
    const documents = await this.client.balance.findMany({
      where: { userId }
    });

    return documents.map(document => this.createEntityFromDocument(document));
  }

  public async findBalanceEntry(userId: string, trainingId: string): Promise<BalanceEntity | null> {
    const document = await this.client.balance.findFirst({
      where: { userId, trainingId }
    });

    if(!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    const existBalance = await this.findById(id);

    await this.client.balance.delete({
      where: { id: existBalance.id }
    });
  }

  public async update(entity: BalanceEntity): Promise<BalanceEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedBalance = await this.client.balance.update({
      where: { id: entity.id},
      data: { ...pojoEntity }
    });

    return this.createEntityFromDocument(updatedBalance);
  }
}
