import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { DbModule } from './db/db.module';
import { AmqpModule } from './amqp/amqp.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DeadQueueModule } from './dead-queue/dead-queue.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AppConfigModule, HealthModule, DbModule, AmqpModule, UsersModule, AuthModule, CryptoModule, DeadQueueModule, MessagesModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
