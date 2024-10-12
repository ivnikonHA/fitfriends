import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingService } from '@fitfriends/training';
import { OrderFactory } from './order.factory';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderFactory: OrderFactory,
    private readonly trainigService: TrainingService
  ) {}

  public async getOrders(userId: string): Promise<OrderEntity[]> {
    return this.orderRepository.findByUserId(userId);
  }

  public async create(userId: string, dto: CreateOrderDto): Promise<OrderEntity> {
    const existTraining = await this.trainigService.getTraining(dto.trainingId);
    const newOrder = this.orderFactory.createFromDto(dto, existTraining.id, userId);

    return this.orderRepository.save(newOrder);
  }
}
