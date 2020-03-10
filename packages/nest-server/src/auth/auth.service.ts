import { Injectable } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    userName: string,
    password: string,
  ): Promise<
    { id: number; username: string; email: string; role: string } | undefined
  > {
    const user = await this.usersService.findOne({ username: userName });
    if (user && user.password === this.usersService.hash(password)) {
      const { password, tokens, ...result } = user;
      return result;
    }
    return;
  }


}
