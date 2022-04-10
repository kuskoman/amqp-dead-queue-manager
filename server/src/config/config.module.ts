import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig } from './base.config';
import { queueConfig } from './queue.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, queueConfig],
      isGlobal: true,
      ignoreEnvFile: false,
      cache: true,
    }),
  ],
})
export class AppConfigModule {}
