import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

import {
  SESSIONS_DIR,
  SESSIONS_FILENAME,
  SESSIONS_PATH,
} from '../../../../common/constants/db.constants';
import { readJsonFile } from '../../../../common/helpers/index';
import {
  CreateSessionInput,
  DeleteSessionInput,
  ISessionsRepository,
} from '../../domain/repositories/session.repository';
import { SessionEntity } from '../../domain/entities/session.entity';

@Injectable()
export class SessionsJsonRepository
  implements ISessionsRepository, OnModuleInit
{
  private readonly logger = new Logger(SessionsJsonRepository.name);

  async onModuleInit() {
    await fs.mkdir(SESSIONS_DIR, { recursive: true });
  }

  private async load(): Promise<SessionEntity[]> {
    return readJsonFile<SessionEntity>(
      SESSIONS_PATH,
      SESSIONS_FILENAME,
      this.logger,
    );
  }

  // створення сесії
  async createSession(data: CreateSessionInput): Promise<SessionEntity> {
    const sessions = await this.load();
    const entity: SessionEntity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    sessions.push(entity);
    await fs.writeFile(SESSIONS_PATH, JSON.stringify(sessions, null, 2));
    return entity;
  }

  // пошук сесії по хешованому токену
  async findByTokenHash(tokenHash: string): Promise<SessionEntity | null> {
    const sessions = await this.load();
    return sessions.find((s) => s.tokenHash === tokenHash) ?? null;
  }

  // отримати всі сесії користувача по id
  async findUserSessions(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.load();
    return sessions.filter((s) => s.userId === userId);
  }

  // Відкликання сесії користувача за sessionId + userId
  async deleteByIdAndUserId({
    sessionId,
    userId,
  }: DeleteSessionInput): Promise<SessionEntity | null> {
    const sessions = await this.load();
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || session.userId !== userId) {
      return null;
    }
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    await fs.writeFile(SESSIONS_PATH, JSON.stringify(updatedSessions, null, 2));
    return session;
  }

  // Видаляє всі сесії конкретного користувача.
  async deleteAllByUserId(userId: string): Promise<number> {
    const sessions = await this.load();
    const filtered = sessions.filter((s) => s.userId !== userId);
    const removed = sessions.length - filtered.length;
    await fs.writeFile(SESSIONS_PATH, JSON.stringify(filtered, null, 2));
    return removed;
  }
}
