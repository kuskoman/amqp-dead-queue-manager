import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { AmqpService } from './amqp.service';

@Injectable()
export class AmqpHealthIndicator extends HealthIndicator {
  constructor(private readonly amqpService: AmqpService) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = this.amqpService.isConnected();

    if (!isHealthy) {
      throw new HealthCheckError('AMQP healthcheck failed', { connected: false });
    }

    const result = this.getStatus(key, isHealthy);
    return result;
  }
}
