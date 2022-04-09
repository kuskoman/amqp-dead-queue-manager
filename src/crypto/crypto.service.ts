import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private readonly jwtService: JwtService) {}

  public async hashPassword(password: string) {
    if (!password) {
      throw new Error("Can't hash empty password");
    }

    return await hash(password, 10);
  }

  public async comparePassword(hash: string, password: string) {
    return await compare(password, hash);
  }

  public async encodeJwt(payload: Parameters<JwtService['signAsync']>[0]): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
