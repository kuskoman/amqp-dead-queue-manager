import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  public async hashPassword(password: string) {
    if (!password) {
      throw new Error("Can't hash empty password");
    }

    return await hash(password, 10);
  }

  public async comparePassword(hash: string, password: string) {
    return await compare(password, hash);
  }
}
