import { ConfigType, registerAs } from '@nestjs/config';
import { requireEnv } from '@src/utils/common.utils';

export const SESSIONS_CONFIG_KEY = 'SESSIONS_CONFIG_KEY';

export const sessionsConfig = registerAs(SESSIONS_CONFIG_KEY, () => ({
  sessionSecret: requireEnv('SESSION_SECRET'),
  sameSite: process.env.NODE_ENV === 'production',
}));

export type SessionsConfig = ConfigType<typeof sessionsConfig>;
