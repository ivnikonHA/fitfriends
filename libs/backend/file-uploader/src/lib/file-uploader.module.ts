import { Module } from '@nestjs/common';

import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileUploaderRepository } from './file-uploader.repository';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('upload.uploadDirectory');
        const serveRoot = configService.get<string>('upload.serveRoot')
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }]
      }
    })
  ],
  controllers: [FileUploaderController],
  providers: [FileUploaderService, FileUploaderFactory, FileUploaderRepository],
  exports: [FileUploaderService],
})
export class FileUploaderModule {}
