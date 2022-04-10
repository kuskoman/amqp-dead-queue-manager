import { AppModule } from '@src/app.module';
import { CommandFactory } from 'nest-commander';

export const bootstrap = async () => {
  await CommandFactory.run(AppModule);
};

bootstrap();
