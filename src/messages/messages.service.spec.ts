import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from '@src/db/db.service';
import { MessagesService } from './messages.service';

describe(MessagesService.name, () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService, { provide: DbService, useValue: {} }],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
