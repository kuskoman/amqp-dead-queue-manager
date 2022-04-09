import 'source-map-support/register';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseConfig, baseConfig } from './config/base.config';
import { setupSwagger } from './swagger';
import { SessionsService } from './auth/sessions.service';

const bootstrap = async () => {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const { port } = app.get<BaseConfig>(baseConfig.KEY);
  const sessionsMiddleware = app.get<SessionsService>(SessionsService).getSessionMiddleware();

  app.use(sessionsMiddleware);
  setupSwagger(app);
  await app.listen(port, () => {
    logger.log(`Server listening on http://localhost:${port}`);
    logger.log(`Swagger available on http://localhost:${port}/api`);
  });
};

bootstrap();
