import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BaseConfig, BASE_CONFIG_KEY } from '@src/config/base.config';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<BaseConfig>(BASE_CONFIG_KEY)!.jwtSecret;
        return {
          secret,
          signOptions: { expiresIn: '15m' },
        };
      },
    }),
  ],
})
export class CryptoModule {}
