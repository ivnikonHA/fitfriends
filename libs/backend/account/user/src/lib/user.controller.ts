import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@fitfriends/helpers';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { RequestWithUser } from './request-with-user.interface';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthenticationResponseMessage } from './user.constant';
import { RequestWithPayload } from './request-with-payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Создать пользователя'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOperation({
    summary: 'Обновить данные пользователя'
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.userService.getUserById(id);
    const updatedUser = await this.userService.updateUser(id, dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }


  @ApiOperation({
    summary: 'Залогинить пользователя'
  })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const accessToken = await this.userService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user?.toPOJO(), ...accessToken});
  }

  @ApiOperation({
    summary: 'Обновить токен'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.RefreshToken
  })
  @ApiBearerAuth('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(@Req() { user }: RequestWithUser) {
    return this.userService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  public async checkAuthenticate(@Req() { user }: RequestWithPayload) {
    if(user?.email) {
      const foundedUser = await this.userService.getUserByEmail(user.email);

      if(foundedUser) {
        return fillDto(LoggedUserRdo, foundedUser);

      }
    }
    throw new UnauthorizedException()
  }

  @ApiOperation({
    summary: 'Получить информацию по пользователю'
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return fillDto(UserRdo, user);
  }

}
