import { Test } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
  let controller: BalanceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BalanceService],
      controllers: [BalanceController],
    }).compile();

    controller = module.get(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
