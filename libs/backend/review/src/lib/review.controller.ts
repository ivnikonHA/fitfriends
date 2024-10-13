import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@fitfriends/helpers';
import { JwtAuthGuard, RequestWithUser } from '@fitfriends/user';
import { ReviewService } from './review.service';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Отзывы')
@Controller('training/:trainingId/reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @ApiOperation({
    summary: 'Получить список отзывов к тренировке'
  })
  @ApiParam({
    name: 'trainingId',
    description: 'Id тренировки'
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async show(@Param('trainingId') trainingId: string) {
    const reviews = await this.reviewService.getReviews(trainingId);

    return fillDto(ReviewRdo, reviews.map(review => review.toPOJO()));
  }

  @ApiOperation({
    summary: 'Добавить отзыв к тренировке'
  })
  @ApiParam({
    name: 'trainingId',
    description: 'Id тренировки'
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Req() { user }: RequestWithUser, @Param('trainingId') trainingId: string, @Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.create(user.id, trainingId, dto);

    return fillDto(ReviewRdo, newReview.toPOJO());
  }
}
