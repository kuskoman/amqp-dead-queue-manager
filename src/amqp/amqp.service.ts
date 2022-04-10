import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { AmqpConnectionManager, connect } from 'amqp-connection-manager';
import { QueueConfig, queueConfig } from '@config/queue.config';

@Injectable()
export class AmqpService implements OnModuleDestroy {
  private readonly logger = new Logger(AmqpService.name);
  private readonly connection: AmqpConnectionManager;
  private readonly maxRetryCount = 5;
  private connectionRetryCount = 0;

  constructor(@Inject(queueConfig.KEY) queueConfig: QueueConfig) {
    this.logger.log('Creating connection');
    this.connection = this.createConnection(queueConfig.url);
  }

  public getConnection() {
    return this.connection;
  }

  public async onModuleDestroy() {
    this.logger.log('Closing connection');
    await this.connection.close();
  }

  private createConnection(url: string) {
    const connection = connect([url], {
      heartbeatIntervalInSeconds: 3,
      connectionOptions: {
        clientProperties: { connection_name: 'AMQP-dead-queue-manager' },
      },
    });

    connection.on('connect', () => {
      this.connectionRetryCount = 0;
    });

    connection.on('connectFailed', ({ err }) => {
      this.handleConnectionFail(err);
    });

    connection.on('disconnect', ({ err }) => {
      this.handleConnectionFail(err);
    });

    return connection;
  }

  private handleConnectionFail(err: unknown) {
    this.logger.error(err);
    this.connectionRetryCount++;

    if (this.connectionRetryCount === this.maxRetryCount) {
      (async () => {
        throw new Error(`Could not connect to server after ${this.connectionRetryCount} trues`);
      })();
    }
  }
}
