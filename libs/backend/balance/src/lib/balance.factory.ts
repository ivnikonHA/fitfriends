import { Balance, EntityFactory } from '@fitfriends/core';
import { Injectable } from '@nestjs/common';
import { BalanceEntity } from './balance.entity';

@Injectable()
export class BalanceFactory implements EntityFactory<BalanceEntity> {
  public create(entityPlainData: Balance): BalanceEntity {
      return new BalanceEntity(entityPlainData);
  }
}
