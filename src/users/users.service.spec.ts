import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CryptoModule } from '@src/crypto/crypto.module';
import { CryptoService } from '@src/crypto/crypto.service';
import { DbService } from '@src/db/db.service';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: DbService, useValue: prismaMock }],
      imports: [CryptoModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  afterEach(jest.clearAllMocks);

  describe('create method', () => {
    it('should convert password to password digest', async () => {
      const password = 'password';
      await service.create({ name: 'michau', password });

      const prismaCreateMock = prismaMock.user.create;
      expect(prismaCreateMock).toBeCalledTimes(1);
      const prismaCall = prismaCreateMock.mock.calls[0][0];
      const digest = prismaCall.data.passwordDigest;

      await expect(cryptoService.comparePassword(digest, password)).resolves.toBe(true);
    });
  });

  describe('findOne method', () => {
    it('should pass serialized arguments to prisma', async () => {
      const name = 'name';
      await service.findOne(name);

      expect(prismaMock.user.findUnique).toBeCalledTimes(1);
      expect(prismaMock.user.findUnique).toBeCalledWith({ where: { name } });
    });
  });
});

const prismaMock = {
  user: {
    create: jest.fn(async (_data: Prisma.UserCreateArgs) => ({})),
    findUnique: jest.fn(async () => ({})),
  },
};
