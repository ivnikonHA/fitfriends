import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from '@fitfriends/training';
import { FitFriendsConfigModule } from '@fitfriends/config';
import { UserModule } from '@fitfriends/user';
import { ReviewModule } from '@fitfriends/review';

@Module({
  imports: [
    TrainingModule,
    FitFriendsConfigModule,
    UserModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
