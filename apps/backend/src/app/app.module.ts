import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from '@fitfriends/training';

@Module({
  imports: [TrainingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
