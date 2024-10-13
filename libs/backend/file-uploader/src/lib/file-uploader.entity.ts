import { Entity, StorableEntity, File } from '@fitfriends/core';

export class FileUploaderEntity extends Entity implements StorableEntity<File> {
  public originalName: string;
  public subDirectory: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt: Date;

  constructor(file?: File) {
    super();
    this.populate(file);
  }

  public populate(file?: File): void {
    if(!file) {
      return;
    }

    this.id = file.id ?? undefined;
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.createdAt = file.createdAt;
  }

  public toPOJO(): File {
    return {
      id: this.id,
      originalName: this.originalName,
      subDirectory: this.subDirectory,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
    }
  }
}
