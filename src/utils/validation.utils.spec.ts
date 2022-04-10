import { IsNotEmpty } from 'class-validator';
import { validateDto } from './validation.utils';

describe('validation utils', () => {
  describe(validateDto.name, () => {
    class MockDto {
      @IsNotEmpty()
      name!: string;
    }

    it('should throw an error when object fails validation', async () => {
      const invalidDto = new MockDto();

      await expect(validateDto(invalidDto, MockDto)).rejects.toThrow();
    });

    it('should not throw an error when object matches requirements', async () => {
      const validDto = new MockDto();
      validDto.name = 'name';

      await validateDto(validDto, MockDto);

      await expect(validateDto(validDto, MockDto)).resolves.not.toThrow();
    });
  });
});
