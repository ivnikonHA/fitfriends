import { genSalt, hash } from 'bcrypt';

import { Hasher } from './hasher';

const SALT_ROUNDS = 10;

export class BcryptHasher implements Hasher {
  public async hash(data: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(data, salt);
  }
}

