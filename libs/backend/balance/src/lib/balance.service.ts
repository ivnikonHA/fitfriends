import { Injectable, NotFoundException } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { BalanceEntity } from './balance.entity';
import { BalanceFactory } from './balance.factory';
import { TrainingService } from '@fitfriends/training';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly balanceFactory: BalanceFactory,
    private readonly trainingService: TrainingService
  ) {}

  public async getBalance(userId: string): Promise<BalanceEntity[]> {
    return this.balanceRepository.findByUserId(userId);
  }

  public async increaseBalance(userId: string, trainingId: string, quantity: number) {
    const existTraining = await this.trainingService.getTraining(trainingId);
    let updatedBalance: BalanceEntity;
    const balanceEntry = await this.balanceRepository.findBalanceEntry(userId, existTraining.id);

    if(balanceEntry) {
      balanceEntry.quantity += quantity;
      updatedBalance = await this.balanceRepository.update(balanceEntry);
    } else {
      const newBalanceEntry = this.balanceFactory.create({userId, trainingId: existTraining.id, quantity});
      updatedBalance = await this.balanceRepository.save(newBalanceEntry);
    }

    return updatedBalance;
  }

  public async spendBalance(userId: string, trainingId: string) {
    const balanceEntry = await this.balanceRepository.findBalanceEntry(userId, trainingId);

    if(!balanceEntry) {
      throw new NotFoundException(`Training with id ${trainingId} not found.`);
    }

    balanceEntry.quantity -= 1;
    const updatedBalance = await this.balanceRepository.update(balanceEntry);

    if(balanceEntry.quantity === 0) {
      await this.balanceRepository.deleteById(balanceEntry.id)
    }

    return updatedBalance;

  }
}
