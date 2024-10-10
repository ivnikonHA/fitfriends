import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthUser, Token, User } from '@fitfriends/core';
import { BcryptHasher, createJWTPayload } from '@fitfriends/helpers';
import { jwtConfig } from '@fitfriends/config';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './user.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenService } from './refresh-token-module/refresh-token.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: BcryptHasher,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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

  public async getUserByEmail(email: string) {
    const user = this.userRepository.findByEmail(email);
    if(!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async getUserById(id: string) {
    const user = this.userRepository.findById(id);
    if(!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch(error) {
      this.logger.error(`[Token generation error: ${error.message}]`);
      throw new HttpException('Token generation error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
