import { compare } from 'bcrypt';

import {
  Entity,
  Level,
  Location,
  Sex,
  StorableEntity,
  Time,
  TrainingType,
  User
} from '@fitfriends/core';

export class UserEntity extends Entity implements StorableEntity<User> {
  public name: string;
  public passwordHash: string;
  public email: string;
  public avatar: string;
  public sex: Sex;
  public dateOfBirth: Date;
  public description: string;
  public location: Location;
  public picture: string;
  public createdAt: Date;
  public level: Level;
  public trainingTypes: TrainingType[];
  public trainingTime: Time;
  public caloriesAll: number;
  public caloriesPerDay: number;
  public ready: boolean;

  constructor(user?: User) {
    super();
    this.populate(user);
  }

  public populate(user?: User): void {
    if(!user) {
      return;
    }

    this.id = user.id ?? '';
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.email = user.email;
    this.avatar = user.avatar;
    this.sex = user.sex;
    this.dateOfBirth = user.dateOfBirth;
    this.description = user.description;
    this.location = user.location;
    this.picture = user.picture;
    this.createdAt = user.createdAt;
    this.level = user.level;
    this.trainingTypes = user.trainingTypes;
    this.trainingTime = user.trainingTime;
    this.caloriesAll = user.caloriesAll;
    this.caloriesPerDay = user.caloriesPerDay;
    this.ready = user.ready;
  }

  public toPOJO(): User {
    return {
      id: this.id,
      name: this.name,
      passwordHash: this.passwordHash,
      email: this.email,
      avatar: this.avatar,
      sex: this.sex,
      dateOfBirth: this.dateOfBirth,
      description: this.description,
      location: this.location,
      picture: this.picture,
      createdAt: this.createdAt,
      level: this.level,
      trainingTypes: this.trainingTypes,
      trainingTime: this.trainingTime,
      caloriesAll: this.caloriesAll,
      caloriesPerDay: this.caloriesPerDay,
      ready: this.ready,
    }
  }

  public async setPassword(passwordHash: string): Promise<UserEntity> {
    this.passwordHash = passwordHash;
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
