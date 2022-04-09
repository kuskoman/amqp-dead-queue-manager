import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { CryptoModule } from '@src/crypto/crypto.module';
import { UsersModule } from '@src/users/users.module';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule, CryptoModule],
  controllers: [AuthController],
})
export class AuthModule {}
