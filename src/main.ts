import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const port = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  logger.log(`Application is listening on port ${port}`);
}

bootstrap();
