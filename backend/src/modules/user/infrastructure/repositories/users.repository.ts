import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

import {
  USERS_DIR,
  USERS_FILENAME,
  USERS_PATH,
} from '../../../../constants/db.constants';
import { UserEntity } from '../../domain/entities/user.entity';
import { readJsonFile } from '../../../../helpers/index';
import { SignupDto } from '../../presentation/dto/signup.dto';

@Injectable()
export class UsersRepository implements OnModuleInit {
  private readonly logger = new Logger(UsersRepository.name);

  async onModuleInit() {
    await fs.mkdir(USERS_DIR, { recursive: true });
  }

  private async load(): Promise<UserEntity[]> {
    return readJsonFile<UserEntity>(USERS_PATH, USERS_FILENAME, this.logger);
  }

  async update(user: UserEntity): Promise<UserEntity | null> {
    const users = await this.load();
    const index = users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return null;
    }

    users[index] = user;
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const users = await this.load();
    const user = users.find((u) => u.email === email);
    return user ?? null;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.load();
  }

  async findById(id: string): Promise<UserEntity | null> {
    const users = await this.load();
    const user = users.find((user) => user.id === id);
    return user ?? null;
  }

  async create(dto: SignupDto): Promise<UserEntity> {
    const users = await this.load();
    const entity: UserEntity = {
      id: randomUUID(),
      ...dto,
      createdAt: new Date().toISOString(),
    };
    users.push(entity);
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    this.logger.log(`[USERS_REPOSITORY] USER_CREATED id=${entity.id}`);
    return entity;
  }

  async removeById(id: string): Promise<void> {
    const users = await this.load();
    const filtered = users.filter((user) => user.id !== id);
    await fs.writeFile(USERS_PATH, JSON.stringify(filtered, null, 2));
    this.logger.log(`[USERS_REPOSITORY] USER_DELETED id=${id}`);
  }
}
