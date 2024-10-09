import { Module } from '@nestjs/common';

import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenFactory } from './refresh-token.factory';

@Module({
  imports: [],
  providers: [
    RefreshTokenService,
    RefreshTokenRepository,
    RefreshTokenFactory,
  ],
  exports: [
    RefreshTokenService
  ]
})
export class RefreshTokenModule {}
