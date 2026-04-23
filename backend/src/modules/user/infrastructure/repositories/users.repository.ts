import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

import {
  USERS_DIR,
  USERS_FILENAME,
  USERS_PATH,
} from '../../../../common/constants/db.constants';
import { UserEntity } from '../../domain/entities/user.entity';
import { readJsonFile } from '../../../../common/helpers/index';
import {
  CreateUserInput,
  IUsersRepository,
  UpdateQuotaInput,
  UpdateStatus,
} from '../../domain/repositories/user.repository';

@Injectable()
export class UsersJsonRepository implements IUsersRepository, OnModuleInit {
  private readonly logger = new Logger(UsersJsonRepository.name);

  async onModuleInit() {
    await fs.mkdir(USERS_DIR, { recursive: true });
  }

  private async load(): Promise<UserEntity[]> {
    return readJsonFile<UserEntity>(USERS_PATH, USERS_FILENAME, this.logger);
  }

  // створення користувача
  async createUser(data: CreateUserInput): Promise<UserEntity> {
    const users = await this.load();
    const entity: UserEntity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    users.push(entity);
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    return entity;
  }

  // пошук користувача по email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const users = await this.load();
    const user = users.find((u) => u.email === email);
    return user ?? null;
  }

  // отримання списку всіх користувачів
  async findAll(): Promise<UserEntity[]> {
    return this.load();
  }

  async findAllUsersOnly(): Promise<UserEntity[]> {
    const users = await this.load();
    return users.filter((u) => u.role === 'USER');
  }

  // пошук користувача по id
  async findById(id: string): Promise<UserEntity | null> {
    const users = await this.load();
    const user = users.find((user) => user.id === id);
    return user ?? null;
  }

  // оновлює статус користувача
  async updateStatus({
    userId,
    status,
  }: UpdateStatus): Promise<UserEntity | null> {
    const users = await this.load();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return null;
    }
    users[index].status = status;
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    return users[index];
  }
  // оновлює квоту користувача
  async updateQuota({
    userId,
    quota,
  }: UpdateQuotaInput): Promise<UserEntity | null> {
    const users = await this.load();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return null;
    }
    users[index].quota = quota;
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    return users[index];
  }

  // async removeById(id: string): Promise<void> {
  //   const users = await this.load();
  //   const filtered = users.filter((user) => user.id !== id);
  //   await fs.writeFile(USERS_PATH, JSON.stringify(filtered, null, 2));
  //   this.logger.log(`[USERS_REPOSITORY] USER_DELETED id=${id}`);
  // }
}
