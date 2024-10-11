import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserService } from '@fitfriends/user';
import { TrainingService } from '@fitfriends/training';
import { ReviewFactory } from './review.factory';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewFactory: ReviewFactory,
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService
  ) {}

  public async getReviews(trainingId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.findByTrainingId(trainingId);
  }

  public async create(userId: string, trainingId: string, dto: CreateReviewDto): Promise<ReviewEntity> {
    const existUser = await this.userService.getUserById(userId);
    const existTraining = await this.trainingService.getTraining(trainingId);
    const newReview = this.reviewFactory.createFromDto(dto, existTraining.id, existUser.id);

    return this.reviewRepository.save(newReview);
  }
}
