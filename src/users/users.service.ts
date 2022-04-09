import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CryptoService } from '@src/crypto/crypto.service';
import { DbService } from '@src/db/db.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService, private readonly cryptoService: CryptoService) {}

  public async create({ name, password }: CreateUserDto) {
    const passwordDigest = await this.cryptoService.hashPassword(password);

    return await this.db.user.create({ data: { passwordDigest, name } });
  }

  public async findOne(username: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { name: username } });
  }
}
