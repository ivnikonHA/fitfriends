import { Injectable } from '@nestjs/common';

import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';
import { PrismaClientService } from '@fitfriends/backend-models';
import { BasePostgresRepository } from '@fitfriends/data-access';
import { JwtToken } from '@fitfriends/core';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, JwtToken> {
  constructor(
    entityFactory: RefreshTokenFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const document = await this.model.findOne({ tokenId }).exec();
    return this.createEntityFromDocument(document);
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.model.deleteMany({ expiresIn: {$lt: new Date()}});
  }
}
