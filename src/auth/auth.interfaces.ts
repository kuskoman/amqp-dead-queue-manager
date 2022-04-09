import { User } from '@prisma/client';

export type UserWithoutDigest = Omit<User, 'passwordDigest'>;

export interface UserLoginRequest extends Record<string, unknown> {
  user: UserWithoutDigest;
}
