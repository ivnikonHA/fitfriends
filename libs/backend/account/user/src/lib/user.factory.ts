import { Injectable } from '@nestjs/common';

import { EntityFactory, User } from '@fitfriends/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: User): UserEntity {
    const entity = new UserEntity();
    this.populate(entity, entityPlainData);

    return entity;
  }

  private populate(entity: UserEntity, user: User) {
    if(!user) {
      return;
    }

    entity.id = user.id ?? '';
    entity.name = user.name;
    entity.passwordHash = user.passwordHash;
    entity.email = user.email;
    entity.avatar = user.avatar;
    entity.sex = user.sex;
    entity.dateOfBirth = user.dateOfBirth;
    entity.description = user.description;
    entity.location = user.location;
    entity.picture = user.picture;
    entity.createdAt = user.createdAt;
    entity.level = user.level;
    entity.trainingTypes = user.trainingTypes;
    entity.trainingTime = user.trainigTime;
    entity.caloriesAll = user.caloriesAll;
    entity.caloriesPerDay = user.caloriesPerDay;
    entity.ready = user.ready;
  }
}
