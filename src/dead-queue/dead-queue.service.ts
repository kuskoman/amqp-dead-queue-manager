import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AmqpService } from '@src/amqp/amqp.service';
import { QueueConfig, queueConfig } from '@src/config/queue.config';
import { MessagesService } from '@src/messages/messages.service';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';

@Injectable()
export class DeadQueueService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DeadQueueService.name);
  private readonly deadQueueNames: string[];
  constructor(
    private readonly amqpService: AmqpService,
    private readonly messagesService: MessagesService,
    @Inject(queueConfig.KEY) queueConfig: QueueConfig,
  ) {
    this.deadQueueNames = queueConfig.deadLetterQueues;
  }

  public async onApplicationBootstrap() {
    const connection = this.amqpService.getConnection();

    this.deadQueueNames.map((queueName) => {
      this.logger.log(`Creating channel for queue ${queueName}`);
      connection.createChannel({
        name: `amqp-dead-queue-manager--${queueName}`,
        json: false,
        setup: async (channel: ConfirmChannel) => {
          this.logger.log(`Starting message consumption for channel assigned to queue ${queueName}`);
          return await channel.consume(queueName, (msg) => this.handleMessage(channel, msg));
        },
      });
    });
  }

  private async handleMessage(channel: ConfirmChannel, msg: ConsumeMessage | null) {
    if (!msg) {
      this.logger.warn('Received null message');
      return;
    }

    this.logger.debug(`Handling received message`);
    const msgBody = Buffer.from(msg.content).toString('utf8');
    const msgFields = JSON.stringify(msg.fields);
    const msgProperties = JSON.stringify(msg.properties);

    await this.saveMessageToDb({ content: msgBody, fields: msgFields, properties: msgProperties });
    channel.ack(msg);
  }

  private async saveMessageToDb(input: Prisma.MessageCreateInput) {
    this.messagesService.create(input);
  }
}
