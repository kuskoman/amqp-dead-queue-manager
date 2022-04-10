import { Module } from '@nestjs/common';
import { AmqpHealthIndicator } from './amqp.health';
import { AmqpService } from './amqp.service';

@Module({
  providers: [AmqpService, AmqpHealthIndicator],
  exports: [AmqpService, AmqpHealthIndicator],
})
export class AmqpModule {}
