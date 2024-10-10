import { PrismaClientModule } from '@fitfriends/backend-models';
import { Module } from '@nestjs/common';
import { ReviewFactory } from './review.factory';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TrainingModule } from '@fitfriends/training';
import { UserModule } from '@fitfriends/user';

@Module({
  imports: [
    PrismaClientModule,
    TrainingModule,
    UserModule
  ],
  controllers: [ReviewController],
  providers: [ReviewFactory, ReviewRepository, ReviewService]
})
export class ReviewModule {}
