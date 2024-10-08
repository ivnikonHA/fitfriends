import { Injectable } from '@nestjs/common';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { PrismaClientService } from '@fitfriends/backend-models';
import { User } from '@fitfriends/core';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, User> {
  constructor(
    entityFactory: UserFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async findById(id: string): Promise<UserEntity> {
    const document = await this.client.user.findFirst({
      where: { id }
    });

    if(!document) {
      throw new Error(`User with id: ${id} not found.`);
    }

    return this.createEntityFromDocument(document as User)
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({
      where: { email }
    });

    if(!document) {
      return null;
    }

    return this.createEntityFromDocument(document as User);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.create({
      data: {
        ...entity.toPOJO()
      }
    });

    if(!record) {
      throw new Error(`Error creating user`);
    }
    entity.id = record.id;
    return this.createEntityFromDocument(record as User);
  }

  public async update(entity: UserEntity): Promise<UserEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.user.update({
      where: { id: pojoEntity.id },
      data: {
        ...pojoEntity
      }
    });

    if(!record) {
      throw new Error(`Error updating user`);
    }
    return this.createEntityFromDocument(record as User);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.user.delete({ where: { id }});
  }

}
