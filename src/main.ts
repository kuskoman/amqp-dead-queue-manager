import 'source-map-support/register';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseConfig, baseConfig } from './config/base.config';
import { setupSwagger } from './swagger';

const bootstrap = async () => {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const { port } = app.get<BaseConfig>(baseConfig.KEY);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setupSwagger(app);
  await app.listen(port, () => {
    logger.log(`Server listening on http://localhost:${port}`);
    logger.log(`Swagger available on http://localhost:${port}/api`);
  });
};

bootstrap();
