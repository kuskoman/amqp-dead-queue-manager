import { Module } from '@nestjs/common';
import { AmqpModule } from '@src/amqp/amqp.module';
import { MessagesModule } from '@src/messages/messages.module';
import { DeadQueueService } from './dead-queue.service';

@Module({
  providers: [DeadQueueService],
  imports: [MessagesModule, AmqpModule],
})
export class DeadQueueModule {}
