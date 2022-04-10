import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AmqpModule } from '@src/amqp/amqp.module';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, AmqpModule],
})
export class HealthModule {}
