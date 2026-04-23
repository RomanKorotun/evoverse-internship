import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { CreateUserUseCase } from '../modules/user/application/create-user/create-user.usecase';
import { UserRole } from '../modules/user/domain/enums/user-role.enum';

async function seedAdmin() {
  const logger = new Logger('SeedAdmin');

  const app = await NestFactory.createApplicationContext(AppModule);

  const createUserUseCase = app.get(CreateUserUseCase);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    logger.error('ADMIN_EMAIL or ADMIN_PASSWORD missing');
    return await app.close();
  }

  try {
    await createUserUseCase.execute({
      email,
      password,
      role: UserRole.ADMIN,
      quota: 524288000, // ( 500 MB = 500 × 1048576 = 524 288 000 байтів )
    });

    logger.log(`Admin created successfully: ${email}`);
  } catch (error) {
    logger.error('Failed to create admin', error);
  } finally {
    await app.close();
    logger.log('Seed finished');
  }
}

seedAdmin();
