import { ConflictException, Injectable } from '@nestjs/common';

import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { SignupDto } from '../presentation/dto/signup.dto';


@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(dto: SignupDto) {
    const exists = await this.userRepository.findByEmail(dto.email);

    if (exists) {
      throw new ConflictException(
        `User with email ${dto.email} already exists`,
      );
    }

    return this.userRepository.create(dto);
  }
}
