import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { fillDto } from '@fitfriends/helpers';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('training/:trainingId/reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @Get('/')
  public async show(@Param('trainingId') trainingId: string) {
    const reviews = await this.reviewService.getReviews(trainingId);

    return fillDto(ReviewRdo, reviews.map(review => review.toPOJO()));
  }

  @Post('/')
  public async create(@Param('trainingId') trainingId: string, @Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.create(trainingId, dto);

    return fillDto(ReviewRdo, newReview.toPOJO());
  }
}
