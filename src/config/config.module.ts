import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig } from './base.config';
import { queueConfig } from './queue.config';
import { sessionsConfig } from './sessions.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, queueConfig, sessionsConfig],
      isGlobal: true,
      ignoreEnvFile: false,
      cache: true,
    }),
  ],
})
export class AppConfigModule {}
