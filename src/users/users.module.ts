import { Module } from '@nestjs/common';
import { CryptoModule } from '@src/crypto/crypto.module';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [CryptoModule],
})
export class UsersModule {}
