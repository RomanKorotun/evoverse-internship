import { NormalizedDevice } from '../types/normalized-device.type';

export interface SessionEntity {
  id: string;
  userId: string;
  tokenHash: string;
  ip: string;
  device: NormalizedDevice;
  createdAt: string;
}
