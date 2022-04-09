import { Module } from '@nestjs/common';
import { AmqpService } from './amqp.service';

@Module({
  providers: [AmqpService],
})
export class AmqpModule {}
