import { NormalizedDevice } from '../../domain/types/normalized-device.type';

export interface SigninCommand {
  email: string;
  password: string;
  ip: string;
  device: NormalizedDevice;
}
