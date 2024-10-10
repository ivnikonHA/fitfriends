import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';

import { fillDto } from '@fitfriends/helpers';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { RequestWithUser } from './request-with-user.interface';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const accessToken = await this.userService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user?.toPOJO(), accessToken});
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(@Req() { user }: RequestWithUser) {
    return this.userService.createUserToken(user);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return fillDto(UserRdo, user);
  }
}
