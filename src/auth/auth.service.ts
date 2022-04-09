import { Injectable } from '@nestjs/common';
import { CryptoService } from '@src/crypto/crypto.service';
import { UsersService } from '@src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly cryptoService: CryptoService) {}

  public async validateUser(name: string, pass: string) {
    const user = await this.usersService.findOne(name);
    if (!user) {
      return null;
    }

    const passwordValid = await this.cryptoService.comparePassword(user.passwordDigest, pass);
    if (!passwordValid) {
      return null;
    }

    const { passwordDigest, ...userData } = user;
    return userData;
  }
}
