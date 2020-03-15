import { Injectable } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
