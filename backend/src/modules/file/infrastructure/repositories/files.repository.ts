import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

import {
  FILES_DIR,
  FILES_FILENAME,
  FILES_PATH,
} from '../../../../constants/db.constants';
import { FileEntity } from '../../domain/entities/file.entity';
import { readJsonFile } from '../../../../helpers/index';
import { CreateFileInput } from '../../domain/inputs/create-file.input';

@Injectable()
export class FilesRepository implements OnModuleInit {
  private readonly logger = new Logger(FilesRepository.name);

  async onModuleInit() {
    await fs.mkdir(FILES_DIR, { recursive: true });
  }

  private async load(): Promise<FileEntity[]> {
    return readJsonFile<FileEntity>(FILES_PATH, FILES_FILENAME, this.logger);
  }

  async getUserUsedSize(userId: string): Promise<number> {
    const files = await this.load();

    return files
      .filter((f) => f.userId === userId)
      .reduce((sum, f) => sum + f.size, 0);
  }

  async getUserStorageStats(userId: string) {
    const files = await this.load();

    return files.reduce(
      (acc, file) => {
        if (file.userId === userId) {
          acc.usedBytes += file.size;
          acc.filesCount += 1;
        }

        return acc;
      },
      { usedBytes: 0, filesCount: 0 },
    );
  }

  async create(input: CreateFileInput): Promise<FileEntity> {
    const files = await this.load();

    const entity: FileEntity = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };

    files.push(entity);
    await fs.writeFile(FILES_PATH, JSON.stringify(files, null, 2));
    this.logger.log(`[FILES][REPOSITORY] FILE_CREATED id=${entity.id}`);
    return entity;
  }

  async findAllByUserId(userId: string): Promise<FileEntity[]> {
    const files = await this.load();
    return files.filter((file) => file.userId === userId);
  }

  async findById(fileId: string): Promise<FileEntity | null> {
    const files = await this.load();
    return files.find((file) => file.id === fileId) ?? null;
  }

  async removeById(fileId: string): Promise<void> {
    const files = await this.load();
    const updated = files.filter((file) => file.id !== fileId);
    await fs.writeFile(FILES_PATH, JSON.stringify(updated, null, 2));
  }

  async removeAllByUserId(userId: string): Promise<void> {
    const files = await this.load();
    const updated = files.filter((f) => f.userId !== userId);
    if (updated.length === files.length) {
      return;
    }
    await fs.writeFile(FILES_PATH, JSON.stringify(updated, null, 2));
  }
}
