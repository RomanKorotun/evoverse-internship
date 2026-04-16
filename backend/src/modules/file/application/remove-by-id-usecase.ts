import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { FilesRepository } from '../infrastructure/repositories/files.repository';
import { FileStorage } from '../infrastructure/storage/files-storage';

@Injectable()
export class RemoveByIdUseCase {
  private readonly logger = new Logger(RemoveByIdUseCase.name);

  constructor(
    private readonly filesRepository: FilesRepository,
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
