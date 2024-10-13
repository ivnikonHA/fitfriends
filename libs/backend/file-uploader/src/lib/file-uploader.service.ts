import 'multer';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { ensureDir, writeFile, } from 'fs-extra';
import { extension } from 'mime-types';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { fileVaultConfig } from '@fitfriends/config';
import { StoredFile } from '@fitfriends/core';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileUploaderRepository } from './file-uploader.repository';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(fileVaultConfig.KEY)
    private readonly config: ConfigType<typeof fileVaultConfig>,
    private readonly fileRepository: FileUploaderRepository
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getUploadSubDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getUploadSubDirectoryPath(), filename);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectory = this.getUploadDirectoryPath();
      const subDirectory = this.getUploadSubDirectoryPath();
      let fileExtension = extension(file.mimetype);
      if(!fileExtension) {
        fileExtension = '';
      }
      const fileName = `${randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDirectory, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        fileName,
        path,
        subDirectory
      }
    } catch(error) {
      this.logger.error(`Error while saving file ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileUploaderEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileUploaderFactory().create({
      hashName: storedFile.fileName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
    });

    const newEntity = await this.fileRepository.save(fileEntity);
    return newEntity;
  }

  public async getFile(fileId: string): Promise<FileUploaderEntity> {
    const existFile = await this.fileRepository.findById(fileId);
    if(!existFile) {
      throw new NotFoundException(`File with id: ${fileId} not found.`);
    }

    return existFile;
  }
}
