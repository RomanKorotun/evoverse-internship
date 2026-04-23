import { FileEntity } from '../entities/file.entity';

export interface CreateFileInput {
  userId: string;
  filename: string;
  size: number;
}

export interface FileStorageStats {
  usedBytes: number;
  filesCount: number;
}

export interface IFilesRepository {
  saveFileMetadata(data: CreateFileInput): Promise<FileEntity>;

  findById(fileId: string): Promise<FileEntity | null>;

  findAllByUserId(userId: string): Promise<FileEntity[]>;

  getUserUsedSize(userId: string): Promise<number>;

  getUserStorageStats(userId: string): Promise<FileStorageStats>;

  removeById(fileId: string): Promise<void>;

  removeAllByUserId(userId: string): Promise<void>;
}
