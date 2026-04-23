import { Injectable } from '@nestjs/common';

import { FindAllUsersUseCase } from '../../../user/application/find-all-users/find-all-users.usecase';
import { UserEntity } from '../../../user/domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

  async execute(): Promise<UserEntity[]> {
    return await this.findAllUsersUseCase.execute();
  }
}
