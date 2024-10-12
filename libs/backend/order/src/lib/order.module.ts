import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderFactory } from './order.factory';
import { OrderRepository } from './order.repository';
import { BalanceModule } from '@fitfriends/balance';
import { TrainingModule } from '@fitfriends/training';

@Module({
  imports: [BalanceModule, TrainingModule],
  controllers: [OrderController],
  providers: [OrderService, OrderFactory, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
