import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CryptoService } from '@src/crypto/crypto.service';
import { DbService } from '@src/db/db.service';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DbService, useValue: prismaMock },
        { provide: CryptoService, useValue: cryptoServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(jest.clearAllMocks);

  describe('create method', () => {
    it('should throw an error when user input is invalid', async () => {
      const invalidUserMock = { name: 'paweu', password: 'a' };
      await expect(service.create(invalidUserMock)).rejects.toThrow();
    });

    it('should not throw when user input matches requirements', async () => {
      const validUserMock = { name: 'paweu', password: 'asdblsjadvwoubfwr!@#E13ea' };
      await expect(service.create(validUserMock)).resolves.not.toThrow();
    });

    it('should convert password to password digest', async () => {
      const hashMock = 'hash';
      const userMock = { password: 'password', name: 'michau' };
      cryptoServiceMock.hashPassword.mockImplementationOnce(async () => hashMock);

      await service.create(userMock);

      expect(prismaMock.user.create).toBeCalledTimes(1);
      expect(prismaMock.user.create).toBeCalledWith({
        data: {
          name: 'michau',
          passwordDigest: hashMock,
        },
      });

      expect(cryptoServiceMock.hashPassword).toBeCalledTimes(1);
      expect(cryptoServiceMock.hashPassword).toBeCalledWith(userMock.password);
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

const cryptoServiceMock = {
  hashPassword: jest.fn(async () => '$a$bc'),
};
