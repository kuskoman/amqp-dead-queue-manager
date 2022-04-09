import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';
import { CryptoService } from './crypto.service';

describe(CryptoService.name, () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService, { provide: JwtService, useValue: jwtServiceMock }],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  describe('hashPassword method', () => {
    it('should throw an error when called with an empty string', async () => {
      await expect(service.hashPassword('')).rejects.toThrow("Can't hash empty password");
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'fontzkursywo';
      const hash1 = await service.hashPassword(password);
      const hash2 = await service.hashPassword(password);

      expect(hash1).not.toStrictEqual(hash2);
    });

    it('should generate password that can be compared using bcrypt', async () => {
      const password = 'prostowaniewahacza';
      const hash = await service.hashPassword(password);

      await expect(compare(password, hash)).resolves.toBe(true);
    });
  });

  describe('comparePassword method', () => {
    it('should return true when password matches hash', async () => {
      const password = 'bmwe36';
      const hash = await service.hashPassword(password);

      await expect(service.comparePassword(hash, password)).resolves.toBe(true);
    });

    it('should return false when password does not match hash', async () => {
      const hash = await service.hashPassword('p');

      await expect(service.comparePassword(hash, 'd')).resolves.toBe(false);
    });
  });

  describe('signJwt method', () => {
    it('should pass arguments to jwtService', async () => {
      const payloadMock = { a: 'b' };
      const mockedEncodedPayload = 'a.b.c';
      jwtServiceMock.signAsync.mockImplementationOnce(async () => mockedEncodedPayload);
      await expect(service.encodeJwt(payloadMock)).resolves.toBe(mockedEncodedPayload);

      expect(jwtServiceMock.signAsync).toBeCalledTimes(1);
      expect(jwtServiceMock.signAsync).toBeCalledWith(payloadMock);
    });
  });
});

const jwtServiceMock = {
  signAsync: jest.fn(),
};
