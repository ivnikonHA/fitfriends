import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@fitfriends/data-access';
import { PrismaClientService } from '@fitfriends/backend-models';
import { File } from '@fitfriends/core';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderRepository extends BasePostgresRepository<FileUploaderEntity, File> {
  constructor(
    entityFactory: FileUploaderFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FileUploaderEntity): Promise<FileUploaderEntity> {
    const document = await this.client.file.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityFromDocument(document);
  }

  public async findById(id: string): Promise<FileUploaderEntity> {
    const document = await this.client.file.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    const existFile = await this.findById(id);

    await this.client.file.delete({
      where: { id: existFile.id }
    });
  }

  public async update(entity: FileUploaderEntity): Promise<FileUploaderEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedFile = await this.client.file.update({
      where: { id: entity.id},
      data: { ...pojoEntity }
    });

    return this.createEntityFromDocument(updatedFile);
  }
}
