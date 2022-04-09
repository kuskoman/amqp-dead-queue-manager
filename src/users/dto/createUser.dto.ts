import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(7)
  password!: string;

  @IsNotEmpty()
  @MinLength(2)
  name!: string;
}
