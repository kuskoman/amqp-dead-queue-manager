import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { AmqpConnectionManager, connect } from 'amqp-connection-manager';
import { QueueConfig, queueConfig } from '@config/queue.config';

@Injectable()
export class AmqpService implements OnModuleDestroy {
  private readonly logger = new Logger(AmqpService.name);
  private readonly connection: AmqpConnectionManager;

  constructor(@Inject(queueConfig.KEY) queueConfig: QueueConfig) {
    this.logger.log('Creating connection');
    this.connection = connect([queueConfig.url], {
      heartbeatIntervalInSeconds: 3,
      connectionOptions: {
        clientProperties: { connection_name: 'AMQP-dead-queue-manager' },
      },
    });
  }

  public getConnection() {
    return this.connection;
  }

  public async onModuleDestroy() {
    this.logger.log('Closing connection');
    await this.connection.close();
  }
}
