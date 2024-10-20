import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { TrainingService } from './training.service';
import { fillDto } from '@fitfriends/helpers';
import { TrainingRdo } from './rdo/training.rdo';
import { TrainingQuery } from './training.query';
import { TrainingWithPagination } from './rdo/training-with-pagination.rdo';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@ApiTags('Тренировки')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  @ApiOperation({
    summary: 'Получить информацию по тренировке'
  })
  @ApiParam({
    name: 'id',
    description: 'Id тренировки'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const training = await this.trainingService.getTraining(id);
    return fillDto(TrainingRdo, training.toPOJO());
  }

  @ApiOperation({
    summary: 'Получить список тренировок'
  })
  @Get('/')
  public async index(@Query() query: TrainingQuery) {
    const result = await this.trainingService.getAllTrainings(query);

    return fillDto(TrainingWithPagination, result);
  }

  @ApiOperation({
    summary: 'Создать тренировку'
  })
  @Post('/')
  public async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining(dto);

    return fillDto(TrainingRdo, newTraining.toPOJO());
  }

  @ApiOperation({
    summary: 'Изменить тренировку'
  })
  @ApiParam({
    name: 'id',
    description: 'Id тренировки'
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainingService.updateTraining(id, dto);

    return fillDto(TrainingRdo, updatedTraining.toPOJO());
  }

  @ApiOperation({
    summary: 'Удалить тренировку'
  })
  @ApiParam({
    name: 'id',
    description: 'Id тренировки'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.trainingService.deleteTraining(id);
  }
}
