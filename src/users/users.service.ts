import { Injectable } from '@nestjs/common';
import { DbService } from '@src/db/db.service';
import { UserCreateInput } from './users.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async createOne({ name, password }: UserCreateInput) {}
}
