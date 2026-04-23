import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

import {
  FILES_DIR,
  FILES_FILENAME,
  FILES_PATH,
} from '../../../../common/constants/db.constants';
import { FileEntity } from '../../domain/entities/file.entity';
import { readJsonFile } from '../../../../common/helpers/index';
import {
  CreateFileInput,
  IFilesRepository,
} from '../../../file/domain/repositories/files.repository';

@Injectable()
export class FilesRepository implements IFilesRepository, OnModuleInit {
  private readonly logger = new Logger(FilesRepository.name);

  async onModuleInit() {
    await fs.mkdir(FILES_DIR, { recursive: true });
  }

  private async load(): Promise<FileEntity[]> {
    return readJsonFile<FileEntity>(FILES_PATH, FILES_FILENAME, this.logger);
  }

  async saveFileMetadata(input: CreateFileInput): Promise<FileEntity> {
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

  // отримати всі файли поточного користувача
  async findAllByUserId(userId: string): Promise<FileEntity[]> {
    const files = await this.load();
    return files.filter((file) => file.userId === userId);
  }

  // Обчислює кількість використаного місця у сховищі (в байтах) для конкретного користувача
  async getUserUsedSize(userId: string): Promise<number> {
    const files = await this.load();
    return files
      .filter((f) => f.userId === userId)
      .reduce((sum, f) => sum + f.size, 0);
  }

  // видалення файла користувача по айді
  async removeById(fileId: string): Promise<void> {
    const files = await this.load();
    const updated = files.filter((file) => file.id !== fileId);
    await fs.writeFile(FILES_PATH, JSON.stringify(updated, null, 2));
  }

  // повертає статистику файлового сховища користувача: загальний розмір використаних байтів та кількість файлів
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

  async findById(fileId: string): Promise<FileEntity | null> {
    const files = await this.load();
    return files.find((file) => file.id === fileId) ?? null;
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
