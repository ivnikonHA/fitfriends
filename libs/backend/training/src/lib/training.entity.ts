import { Entity, Level, Sex, StorableEntity, Time, Training, TrainingType } from '@fitfriends/core';

export class TrainingEntity extends Entity implements StorableEntity<Training> {
  public name: string;
  public picture: string;
  public level: Level;
  public trainingType: TrainingType;
  public trainingTime: Time;
  public price: number;
  public calories: number;
  public description: string;
  public sex: Sex;
  public video: string;
  public rating: number;
  public trainer: string;
  public special: boolean;

  constructor(training?: Training) {
    super();
    this.populate(training);
  }

  public populate(training?: Training): void {
    if(!training) {
      return;
    }

    this.id = training.id ?? undefined;
    this.name = training.name;
    this.picture = training.picture;
    this.level = training.level;
    this.trainingType = training.trainingType;
    this.trainingTime = training.trainingTime;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.sex = training.sex;
    this.video = training.video;
    this.rating = training.rating;
    this.trainer = training.trainer;
    this.special = training.special;
  }

  public toPOJO(): Training {
    return {
      id: this.id,
      name: this.name,
      picture: this.picture,
      level: this.level,
      trainingType: this.trainingType,
      trainingTime: this.trainingTime,
      price: this.price,
      calories: this.calories,
      description: this.description,
      sex: this.sex,
      video: this.video,
      rating: this.rating,
      trainer: this.trainer,
      special: this.special,
    }
  }
}
