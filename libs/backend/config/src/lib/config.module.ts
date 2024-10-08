import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';

import applicationConfig from './configurations/app.config';
import jwtConfig from './configurations/jwt/jwt.config';

const ENV_FILE = '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig],
      envFilePath: ENV_FILE
    })
  ]
})
export class FitFriendsConfigModule {}
