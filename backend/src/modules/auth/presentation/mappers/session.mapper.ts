import { Injectable } from '@nestjs/common';

import { SessionEntity } from '../../domain/entities/session.entity';

export interface SessionResponse {
  id: string;
  ip: string;
  device: {
    browser: string;
    os: string;
    type: string;
  };
  createdAt: string;
}

@Injectable()
export class SessionMapper {
  toResponse(session: SessionEntity): SessionResponse {
    return {
      id: session.id,
      ip: session.ip,
      device: session.device,
      createdAt: session.createdAt,
    };
  }
}
