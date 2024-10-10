import { Injectable } from '@nestjs/common';

import { EntityFactory, Review } from '@fitfriends/core';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewFactory implements EntityFactory<ReviewEntity> {
  public create(entityPlainData: Review): ReviewEntity {
      return new ReviewEntity(entityPlainData);
  }

  public createFromDto(dto: CreateReviewDto, trainingId: string, userId: string): ReviewEntity {
    const currentDate = new Date();

    return new ReviewEntity({
      ...dto,
      trainingId,
      userId,
      createdAt: currentDate
    });
  }
}
