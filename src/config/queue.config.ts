import { ConfigType, registerAs } from '@nestjs/config';
import { requireEnv } from 'src/utils/common.utils';

export const QUEUE_CONFIG_KEY = 'QUEUE_CONFIG_KEY';

export const queueConfig = registerAs(QUEUE_CONFIG_KEY, () => ({
  url: requireEnv('QUEUE_URL'),
}));

export type QueueConfig = ConfigType<typeof queueConfig>;
