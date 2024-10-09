import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtOptions } from '@fitfriends/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserRepository } from './user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { BcryptHasher } from '@fitfriends/helpers';
import { UserFactory } from './user.factory';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    BcryptHasher,
    JwtAccessStrategy,
    LocalStrategy,
    UserFactory,
    UserRepository
  ],
  exports: [UserService],
})
export class UserModule {}
