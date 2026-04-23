import { Inject, Injectable } from '@nestjs/common';

import type { IFilesRepository } from '../../domain/repositories/files.repository';

@Injectable()
export class FindAllFilesUseCase {
  constructor(
    @Inject('IFilesRepository')
    private readonly filesRepository: IFilesRepository,
  ) {}

  async execute(userId: string) {
    return this.filesRepository.findAllByUserId(userId);
  }
}
