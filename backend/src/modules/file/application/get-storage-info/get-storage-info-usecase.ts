import { Inject, Injectable } from '@nestjs/common';

import type { IFilesRepository } from '../../domain/repositories/files.repository';
import { FindUserByIdUseCase } from '../../../user/application/find-user-by-id/find-user-by-id.usecase';

@Injectable()
export class GetStorageInfoUseCase {
  constructor(
    @Inject('IFilesRepository')
    private readonly filesRepository: IFilesRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(userId: string) {
    const stats = await this.filesRepository.getUserStorageStats(userId);
    const user = await this.findUserByIdUseCase.execute(userId);

    return {
      quota: user.quota,
      usedBytes: stats.usedBytes,
      filesCount: stats.filesCount,
    };
  }
}
