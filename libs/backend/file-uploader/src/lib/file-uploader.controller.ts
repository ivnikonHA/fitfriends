import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@fitfriends/helpers';
import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@ApiTags('Загрузка файлов')
@Controller('files')
export class FileUploaderController {
  constructor(private fileUploaderService: FileUploaderService) {}

  @ApiOperation({
    summary: 'Загрузить файл'
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiOperation({
    summary: 'Получить информацию о файле'
  })
  @ApiParam({
    name: 'id',
    description: 'Id файла'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existFile = await this.fileUploaderService.getFile(id);
    return fillDto(UploadedFileRdo, existFile.toPOJO());
  }
}
