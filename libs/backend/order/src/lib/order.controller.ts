import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard, RequestWithPayload } from '@fitfriends/user';
import { fillDto } from '@fitfriends/helpers';
import { OrderRdo } from './rdo/order.rdo';
import { CreateOrderDto } from './dto/create-order.dto';
import { BalanceService } from '@fitfriends/balance';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Заказы')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly balanceService: BalanceService
  ) {}

  @ApiOperation({
    summary: 'Получить список заказов пользователя'
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(@Req() { user }: RequestWithPayload) {
    const orders = await this.orderService.getOrders(user.sub);

    return fillDto(OrderRdo, orders.map((order) => order.toPOJO()));
  }

  @ApiOperation({
    summary: 'Создать заказ'
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Req() { user }: RequestWithPayload, @Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.create(user.sub, dto);
    await this.balanceService.increaseBalance(user.sub, dto.trainingId, dto.quantity);

    return fillDto(OrderRdo, newOrder);
  }
}
