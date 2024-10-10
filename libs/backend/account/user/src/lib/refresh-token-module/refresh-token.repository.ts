import { Injectable, NotFoundException } from '@nestjs/common';

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

  public async save(entity: RefreshTokenEntity): Promise<RefreshTokenEntity> {
      const document = await this.client.refreshToken.create({
        data: { ...entity.toPOJO()}
      });

      if(!document) {
        throw new Error(`Error creating refresh token`);
      }

      return this.createEntityFromDocument(document as JwtToken);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.client.refreshToken.delete({
      where: { tokenId }
    });
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const document = await this.client.refreshToken.findFirst({
      where: { tokenId }
    });
    if(!document) {
      throw new NotFoundException(`Refresh token with ${tokenId} not found.`);
    }

    return this.createEntityFromDocument(document as JwtToken);
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.client.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date()}
      }
    });
  }
}
