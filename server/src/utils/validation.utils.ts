import { ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = async (dto: object, validationClass: ClassConstructor<any>) => {
  const ensuredDto = Object.assign(new validationClass(), dto);

  await validate(ensuredDto).then((errors) => {
    if (errors && errors.length > 0) {
      throw new Error(errors.map((err) => err.toString()).join('\n'));
    }
  });
};
