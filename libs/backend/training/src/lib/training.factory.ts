import { EntityFactory, Training } from '@fitfriends/core';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  public create(entityPlainData: Training): TrainingEntity {
    const entity = new TrainingEntity();
    this.populate(entity, entityPlainData);

    return entity;
  }

  private populate(entity: TrainingEntity, training: Training) {
    if(!training) {
      return;
    }

    entity.id = training.id ?? undefined;
    entity.name = training.name;
    entity.picture = training.picture;
    entity.level = training.level;
    entity.trainingType = training.trainingType;
    entity.trainingTime = training.trainingTime;
    entity.price = training.price;
    entity.calories = training.calories;
    entity.description = training.description;
    entity.sex = training.sex;
    entity.video = training.video;
    entity.rating = training.rating;
    entity.trainer = training.trainer;
    entity.special = training.special;
    entity.reviews = [];
  }
}
