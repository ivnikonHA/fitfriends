import { Test } from '@nestjs/testing';
import { FileUploaderService } from './file-uploader.service';

describe('FileUploaderService', () => {
  let service: FileUploaderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FileUploaderService],
    }).compile();

    service = module.get(FileUploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
