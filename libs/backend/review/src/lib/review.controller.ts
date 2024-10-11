import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { fillDto } from '@fitfriends/helpers';
import { JwtAuthGuard } from '@fitfriends/user';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { RequestWithUser } from '@fitfriends/user';

@Controller('training/:trainingId/reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async show(@Param('trainingId') trainingId: string) {
    const reviews = await this.reviewService.getReviews(trainingId);

    return fillDto(ReviewRdo, reviews.map(review => review.toPOJO()));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Req() { user }: RequestWithUser, @Param('trainingId') trainingId: string, @Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.create(user.id, trainingId, dto);

    return fillDto(ReviewRdo, newReview.toPOJO());
  }
}
