import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { BaseConfig, baseConfig } from '@src/config/base.config';
import { UserTokenData } from '../auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(baseConfig.KEY) baseConfig: BaseConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: baseConfig.jwtSecret,
    });
  }

  async validate(payload: UserTokenData) {
    return { userId: payload.sub, username: payload.username };
  }
}
