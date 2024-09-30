import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { PrismaClientService } from '@fitfriends/backend-models';
import { PaginationResult, Review, Training } from '@fitfriends/core';
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
        ...entity.toPOJO(),
      }
    });
    return this.createEntityFromDocument(record);
  }

  public async find(query?: TrainingQuery): Promise<PaginationResult<Training>> {
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
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateTrainingPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }
}
