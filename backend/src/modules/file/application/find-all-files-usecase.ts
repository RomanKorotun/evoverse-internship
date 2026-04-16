import { Injectable } from '@nestjs/common';

import { FilesRepository } from '../infrastructure/repositories/files.repository';

@Injectable()
export class FindAllFilesUseCase {
  constructor(private readonly filesRepository: FilesRepository) {}

  async execute(userId: string) {
    return this.filesRepository.findAllByUserId(userId);
  }
}
