import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT_INTERNAL = process.env.PORT_INTERNAL || 3000;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({});

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(PORT_INTERNAL, () =>
    logger.log(`Server is running on ${PORT_INTERNAL} PORT`),
  );
}
bootstrap();
