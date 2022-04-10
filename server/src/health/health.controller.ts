import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { AmqpHealthIndicator } from '@src/amqp/amqp.health';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private amqpHealth: AmqpHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.amqpHealth.isHealthy('amqp')]);
  }
}
