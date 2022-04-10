import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OffsetPaginationInput } from '@src/db/db.interfaces';
import { DbService } from '@src/db/db.service';

@Injectable()
export class MessagesService {
  constructor(private readonly db: DbService) {}

  public async create(input: Prisma.MessageCreateInput) {
    return await this.db.message.create({ data: input });
  }

  public async findOne(id: number) {
    return await this.db.message.findUnique({ where: { id } });
  }

  public async findMany({ offset, limit }: OffsetPaginationInput) {
    return await this.db.message.findMany({ orderBy: { id: 'desc' }, skip: offset, take: limit });
  }
}
