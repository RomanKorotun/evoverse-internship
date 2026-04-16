import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/application/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  }
}
