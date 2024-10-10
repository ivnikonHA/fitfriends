import { BasePostgresRepository } from '@fitfriends/data-access';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { Review } from '@fitfriends/core';
import { ReviewFactory } from './review.factory';
import { PrismaClientService } from '@fitfriends/backend-models';

@Injectable()
export class ReviewRepository extends BasePostgresRepository<ReviewEntity, Review> {
  constructor(
    entityFactory: ReviewFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: ReviewEntity): Promise<ReviewEntity> {
      const document = await this.client.review.create({
        data: { ...entity.toPOJO()}
      });
      entity.id = document.id;

      return this.createEntityFromDocument(document);
  }

  public async findById(id: string): Promise<ReviewEntity> {
      const document = await this.client.review.findFirst({
        where: { id }
      });

      if(!document) {
        throw new NotFoundException(`Review with id ${id} not found`);
      }

      return this.createEntityFromDocument(document);
  }

  public async findByTrainingId(trainingId: string): Promise<ReviewEntity[]> {
    const documents = await this.client.review.findMany({
      where: { trainingId }
    });

    return documents.map(document => this.createEntityFromDocument(document));
  }
}
