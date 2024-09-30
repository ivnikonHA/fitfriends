import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { TrainingService } from './training.service';
import { fillDto } from '@fitfriends/helpers';
import { TrainingRdo } from './rdo/training.rdo';
import { TrainingQuery } from './training.query';
import { TrainingWithPagination } from './rdo/training-with-pagination.rdo';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  @Get(':id')
  public async show(@Param('id') id: string) {
    const training = await this.trainingService.getTraining(id);
    return fillDto(TrainingRdo, training.toPOJO());
  }

  @Get('/')
  public async index(@Query() query: TrainingQuery) {
    const result = await this.trainingService.getAllTrainings(query);

    return fillDto(TrainingWithPagination, result);
  }

  @Post('/')
  public async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining(dto);

    return fillDto(TrainingRdo, newTraining.toPOJO());
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainingService.updateTraining(id, dto);

    return fillDto(TrainingRdo, updatedTraining.toPOJO());
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.trainingService.deleteTraining(id);
  }
}
