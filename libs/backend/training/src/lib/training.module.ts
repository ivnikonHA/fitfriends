import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { PrismaClientModule } from '@fitfriends/backend-models';

@Module({
  imports: [PrismaClientModule],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, TrainingFactory],
  exports: [TrainingService]
})
export class TrainingModule {}
