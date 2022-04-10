import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export type UserWithoutDigest = Omit<User, 'passwordDigest'>;

export interface UserLoginRequest extends Record<string, unknown> {
  user: UserWithoutDigest;
}

export interface UserTokenData {
  username: string;
  sub: number;
}

/* This class is not really used by business logic, but Swagger needs it to generate documentation */
export class UserLoginRequest {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;
}
