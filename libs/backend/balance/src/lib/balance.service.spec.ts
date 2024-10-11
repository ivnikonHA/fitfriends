import { Test } from '@nestjs/testing';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BalanceService],
    }).compile();

    service = module.get(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
