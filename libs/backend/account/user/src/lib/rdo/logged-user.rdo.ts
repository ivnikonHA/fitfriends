import { Expose } from 'class-transformer';

import { Role } from '@fitfriends/core';

export class LoggedUserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public role: Role

  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string;
}
