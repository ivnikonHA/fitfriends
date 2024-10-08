import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BcryptHasher } from '@fitfriends/helpers';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './user.constant';
import { AuthUser } from '@fitfriends/core';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: BcryptHasher
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const user: AuthUser = { ...dto, passwordHash: ''};
    const existUser = await this.userRepository.findByEmail(dto.email);
    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS)
    }
    const userEntity = await new UserEntity(user)
      .setPassword(await this.hasher.hash(dto.password));
    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if(! await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }
}
