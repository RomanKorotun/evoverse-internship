import { Request } from 'express';

export interface CreateFileCommand {
  id: string;
  req: Request;
}
