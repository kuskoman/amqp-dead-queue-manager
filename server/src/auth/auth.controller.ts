import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginRequest } from './auth.interfaces';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserLoginRequest })
  async login(@Request() req: UserLoginRequest) {
    this.logger.verbose(`Received login request for userId ${req.user.id}`);
    return await this.authService.login(req.user);
  }
}
