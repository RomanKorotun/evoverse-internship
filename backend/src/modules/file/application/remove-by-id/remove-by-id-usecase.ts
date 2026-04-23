import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

import { FileStorage } from '../../infrastructure/storage/files-storage';
import type { IFilesRepository } from '../../domain/repositories/files.repository';

@Injectable()
export class RemoveByIdUseCase {
  private readonly logger = new Logger(RemoveByIdUseCase.name);

  constructor(
    @Inject('IFilesRepository')
    private readonly filesRepository: IFilesRepository,
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(fileId: string, userId: string) {
    const file = await this.filesRepository.findById(fileId);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.fileStorage.deleteFile(file.filename);

    await this.filesRepository.removeById(fileId);

    this.logger.log(
      `[FILES][DELETE] fileId=${fileId} userId=${userId} filename=${file.filename}`,
    );

    return {
      message: 'Файл успішно видалено',
      fileId,
    };
  }
}
