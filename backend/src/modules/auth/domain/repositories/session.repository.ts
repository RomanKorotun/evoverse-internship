import { SessionEntity } from '../entities/session.entity';

export interface CreateSessionInput {
  userId: string;
  tokenHash: string;
  ip: string;
  device: {
    browser: string;
    os: string;
    type: string;
  };
}

export interface DeleteSessionInput {
  sessionId: string;
  userId: string;
}

export interface ISessionsRepository {
  createSession(data: CreateSessionInput): Promise<SessionEntity>;
  findByTokenHash(tokenHash: string): Promise<SessionEntity | null>;
  findUserSessions(userId: string): Promise<SessionEntity[]>;
  deleteByIdAndUserId(data: DeleteSessionInput): Promise<SessionEntity | null>;
  deleteAllByUserId(userId: string): Promise<number>;
}
