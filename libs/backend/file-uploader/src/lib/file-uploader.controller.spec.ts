import { Test } from '@nestjs/testing';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

describe('FileUploaderController', () => {
  let controller: FileUploaderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FileUploaderService],
      controllers: [FileUploaderController],
    }).compile();

    controller = module.get(FileUploaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
