import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../../user/infrastructure/repositories/users.repository';
import { FilesRepository } from '../../file/infrastructure/repositories/files.repository';
import { FileStorage } from '../../file/infrastructure/storage/files-storage';

@Injectable()
export class DeleteUserAccountUseCase {
  private readonly logger = new Logger(DeleteUserAccountUseCase.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesRepository: FilesRepository,
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const files = await this.filesRepository.findAllByUserId(userId);

    const results = await Promise.allSettled(
      files.map((file) => this.fileStorage.deleteFile(file.filename)),
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        this.logger.error(
          `[USER DELETE][STORAGE FAIL] file=${files[index].filename} error=${result.reason}`,
        );
      } else {
        this.logger.log(
          `[USER DELETE][STORAGE OK] file=${files[index].filename}`,
        );
      }
    });

    await this.filesRepository.removeAllByUserId(userId);

    await this.usersRepository.removeById(userId);

    this.logger.log(
      `[USER DELETE COMPLETE] userId=${userId} email=${user.email}`,
    );

    return {
      message: `Користувач ${user.email} та всі файли видалені`,
    };
  }
}
