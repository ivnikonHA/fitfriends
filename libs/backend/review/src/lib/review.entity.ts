import { Entity, Review, StorableEntity } from '@fitfriends/core';

export class ReviewEntity extends Entity implements StorableEntity<Review> {
  public userId: string;
  public trainingId: string;
  public rate: number;
  public text: string;
  public createdAt: Date;

  constructor(review?: Review) {
    super();
    this.populate(review);
  }

  public populate(review?: Review) {
    if(!review) {
      return;
    }

    this.id = review.id ?? undefined;
    this.createdAt = review.createdAt;
    this.trainingId = review.trainingId;
    this.rate = review.rate;
    this.text = review.text;
    this.userId = review.userId;
  }

  public toPOJO(): Review {
      return {
        id: this.id,
        createdAt: this.createdAt,
        trainingId: this.trainingId,
        rate: this.rate,
        text: this.text,
        userId: this.userId
      }
  }
}
