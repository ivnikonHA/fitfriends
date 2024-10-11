import { Module } from '@nestjs/common';

import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BalanceFactory } from './balance.factory';
import { BalanceRepository } from './balance.repository';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, BalanceFactory, BalanceRepository],
  exports: [BalanceService],
})
export class BalanceModule {}
