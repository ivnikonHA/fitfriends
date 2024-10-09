import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from '@fitfriends/training';
import { FitFriendsConfigModule } from '@fitfriends/config';
import { UserModule } from '@fitfriends/user';

@Module({
  imports: [TrainingModule, FitFriendsConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
