import { ConfigType, registerAs } from '@nestjs/config';
import { requireEnv } from '@src/utils/common.utils';

export const BASE_CONFIG_KEY = 'BASE_CONFIG_KEY';

export const baseConfig = registerAs(BASE_CONFIG_KEY, () => ({
  port: +(process.env.PORT || 4100),
  jwtSecret: requireEnv('JWT_SECRET'),
}));

export type BaseConfig = ConfigType<typeof baseConfig>;
