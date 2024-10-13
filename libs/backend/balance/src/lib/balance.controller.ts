import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RequestWithPayload } from '@fitfriends/user';
import { BalanceService } from './balance.service';
import { fillDto } from '@fitfriends/helpers';
import { BalanceRdo } from './rdo/balance.rdo';
import { IncreaseBalanceDto } from './dto/increase-balance.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Баланс')
@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @ApiOperation({
    summary: 'Получить баланс пользователя'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Баланс пользователя',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(@Req() { user }: RequestWithPayload) {
    const balanceEntries = await this.balanceService.getBalance(user.sub);

    return fillDto(BalanceRdo, balanceEntries.map((balanceEntry) => balanceEntry.toPOJO()));
  }

  @ApiOperation({
    summary: 'Потратить баланс пользователя по тренировке'
  })
  @ApiParam({
    name: 'trainingId',
    description: 'Id тренировки'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Баланс пользователя',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':trainingId')
  public async spend(
    @Req() { user }: RequestWithPayload,
    @Param('trainingId') trainingId: string) {
      return this.balanceService.spendBalance(user.sub, trainingId);
  }

  @ApiOperation({
    summary: 'Пополнить баланс пользователя'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Баланс пользователя',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async increase(
    @Req() { user }: RequestWithPayload,
    @Body() {trainingId, quantity}: IncreaseBalanceDto
  ) {
    return this.balanceService.increaseBalance(user.sub, trainingId, quantity);
  }

}
