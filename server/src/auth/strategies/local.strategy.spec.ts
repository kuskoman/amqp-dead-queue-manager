import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe(LocalStrategy.name, () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, { provide: AuthService, useValue: authServiceMock }],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  afterEach(jest.clearAllMocks);

  describe('validate method', () => {
    const username = 'username';
    const password = 'password';

    it('should throw an error when authService returns null instead of user', async () => {
      authServiceMock.validateUser.mockImplementationOnce(async () => null);

      await expect(strategy.validate(username, password)).rejects.toThrow(UnauthorizedException);

      expect(authServiceMock.validateUser).toBeCalledTimes(1);
      expect(authServiceMock.validateUser).toBeCalledWith(username, password);
    });

    it('should return user when credentials are valid', async () => {
      const userMock = { name: 'name' };
      authServiceMock.validateUser.mockImplementationOnce(async () => userMock);

      await expect(strategy.validate(username, password)).resolves.toBe(userMock);

      expect(authServiceMock.validateUser).toBeCalledTimes(1);
      expect(authServiceMock.validateUser).toBeCalledWith(username, password);
    });
  });
});

const authServiceMock = {
  validateUser: jest.fn(),
};
