import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { PrismaClientService } from '@fitfriends/backend-models';
import { PaginationResult, Training } from '@fitfriends/core';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { TrainingQuery } from './training.query';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, Training> {
  constructor(
    entityFactory: TrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getTrainingCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.client.training.count({where});
  }

  private calculateTrainingPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: TrainingEntity): Promise<TrainingEntity> {
    const record = await this.client.training.create({
      data: {
        ...entity.toPOJO()
      }
    });
    entity.id = record.id;
    return this.createEntityFromDocument(record as Training);
  }

  public async find(query?: TrainingQuery): Promise<PaginationResult<TrainingEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.TrainingWhereInput = {};
    // const orderBy: Prisma.PostOrderByWithRelationInput = query.sortBy === SortBy.CreatedAt
    // ?{
    //   [query.sortBy]: query.sortDirection
    // }
    // :{
    //   [query.sortBy]: {
    //     _count: query.sortDirection
    //   }
    // };

    const [records, postCount] = await Promise.all([
      this.client.training.findMany({where, skip, take}),
      this.getTrainingCount(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as Training)),
      currentPage: query?.page,
      totalPages: this.calculateTrainingPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }

  public async findById(id: string): Promise<TrainingEntity> {
    const document = await this.client.training.findFirst({
      where: { id }
    });

    if(!document) {
      throw new Error(`Training with id: ${id} not found.`);
    }

    return this.createEntityFromDocument(document as Training);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.training.delete({
      where: { id }
    });
  }

  public async update(entity: TrainingEntity): Promise<TrainingEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.training.update({
      where: { id: pojoEntity.id },
      data: {
        ...pojoEntity
      }
    });

    return this.createEntityFromDocument(record as Training);
  }
}
