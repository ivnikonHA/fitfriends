import { Injectable } from '@nestjs/common';
import { TrainingQuery } from './training.query';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingFactory } from './training.factory';
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
    const post = await this.trainingRepository.findById(id);
    if(!post) {
      return;
    }

    await this.trainingRepository.update(post);

    return post;
  }
}
