import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@fitfriends/helpers';
import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileUploaderController {
  constructor(private fileUploaderService: FileUploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existFile = await this.fileUploaderService.getFile(id);
    return fillDto(UploadedFileRdo, existFile.toPOJO());
  }
}
