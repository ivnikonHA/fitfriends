import { Injectable } from '@nestjs/common';

import { TrainingQuery } from './training.query';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingFactory: TrainingFactory
  ) {}

  public async getAllTrainings(query?: TrainingQuery) {
    const trainingsWithPagination = await this.trainingRepository.find(query);
    const result = {
      ...trainingsWithPagination,
      entities: trainingsWithPagination.entities.map((training) => training.toPOJO())
    }
    return result;
  }

  public async getTraining(id: string): Promise<TrainingEntity> {
    return this.trainingRepository.findById(id);
  }

  public async createTraining(dto: CreateTrainingDto): Promise<TrainingEntity> {
    const newTrainingEntity = this.trainingFactory.create({
      ...dto
    });
    const createdPost = await this.trainingRepository.save(newTrainingEntity);

    const foundPost = await this.trainingRepository.findById(createdPost.id);
    return foundPost;
  }

  public async deleteTraining(id: string) {
    await this.trainingRepository.deleteById(id);
  }

  public async updateTraining(id: string, dto: UpdateTrainingDto) {
    const training = await this.trainingRepository.findById(id);
    if(!training) {
      return;
    }

    for(const [key, value] of Object.entries(dto)) {
      if(value !== undefined && training[key] !== value) {
        training[key] = value;
      }
    }

    const result = await this.trainingRepository.update(training);

    return result;
  }
}
