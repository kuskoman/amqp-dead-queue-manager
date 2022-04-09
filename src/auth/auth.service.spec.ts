import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '@src/crypto/crypto.service';
import { UsersService } from '@src/users/users.service';
import { UserWithoutDigest } from './auth.interfaces';
import { AuthService } from './auth.service';

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: CryptoService, useValue: cryptoServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(jest.clearAllMocks);

  describe('validateUser method', () => {
    it('should return null when user does not exist', async () => {
      usersServiceMock.findOne.mockImplementationOnce(async () => null);

      await expect(service.validateUser('name', 'pass')).resolves.toBe(null);

      expect(usersServiceMock.findOne).toBeCalledTimes(1);
      expect(usersServiceMock.findOne).toBeCalledWith('name');
      expect(cryptoServiceMock.comparePassword).not.toBeCalled();
    });

    it('should return null when user exists, but password is invalid', async () => {
      const mockedUser = { name: 'andrzej', passwordDigest: 'hasloandrzeja' };
      const inputPassword = 'pass';

      usersServiceMock.findOne.mockImplementationOnce(async () => mockedUser);
      cryptoServiceMock.comparePassword.mockImplementationOnce(async () => false);

      await expect(service.validateUser(mockedUser.name, inputPassword)).resolves.toBe(null);

      expect(usersServiceMock.findOne).toBeCalledTimes(1);
      expect(usersServiceMock.findOne).toBeCalledWith(mockedUser.name);
      expect(cryptoServiceMock.comparePassword).toBeCalledTimes(1);
      expect(cryptoServiceMock.comparePassword).toBeCalledWith(mockedUser.passwordDigest, inputPassword);
    });

    it('should return user without passwordDigest when password is valid', async () => {
      const mockedUser = { name: 'andrzej', passwordDigest: 'hasloandrzeja' };
      const inputPassword = 'pass';

      usersServiceMock.findOne.mockImplementationOnce(async () => mockedUser);
      cryptoServiceMock.comparePassword.mockImplementationOnce(async () => true);

      const { passwordDigest, ...mockedUserWithoutDigest } = mockedUser;

      await expect(service.validateUser(mockedUser.name, 'pass')).resolves.toStrictEqual(mockedUserWithoutDigest);

      expect(usersServiceMock.findOne).toBeCalledTimes(1);
      expect(usersServiceMock.findOne).toBeCalledWith(mockedUser.name);
      expect(cryptoServiceMock.comparePassword).toBeCalledTimes(1);
      expect(cryptoServiceMock.comparePassword).toBeCalledWith(mockedUser.passwordDigest, inputPassword);
    });
  });

  describe('login method', () => {
    it('should create jwt with user data', async () => {
      const userMock: UserWithoutDigest = {
        id: 1,
        name: 'name',
      };
      const jwtMock = 'a.b.c';
      cryptoServiceMock.encodeJwt.mockImplementationOnce(async () => jwtMock);

      await expect(service.login(userMock)).resolves.toBe(jwtMock);

      expect(cryptoServiceMock.encodeJwt).toBeCalledTimes(1);
      expect(cryptoServiceMock.encodeJwt).toBeCalledWith({ sub: userMock.id, username: userMock.name });
    });
  });
});

const usersServiceMock = {
  findOne: jest.fn(),
};

const cryptoServiceMock = {
  comparePassword: jest.fn(),
  encodeJwt: jest.fn(),
};
