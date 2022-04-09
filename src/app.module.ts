import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { DbModule } from './db/db.module';
import { AmqpModule } from './amqp/amqp.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [AppConfigModule, HealthModule, DbModule, AmqpModule, UsersModule, AuthModule, CryptoModule],
})
export class AppModule {}
