import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_TIME: Joi.number().required(),
      }),
    }),
    UserModule,
    FileModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
