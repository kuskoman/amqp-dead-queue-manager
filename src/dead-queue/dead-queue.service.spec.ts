import { Test, TestingModule } from '@nestjs/testing';
import { DeadQueueService } from './dead-queue.service';

describe(DeadQueueService.name, () => {
  let service: DeadQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeadQueueService],
    }).compile();

    service = module.get<DeadQueueService>(DeadQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
