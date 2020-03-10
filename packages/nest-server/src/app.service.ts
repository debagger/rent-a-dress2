import * as entities from '@rent-a-dress/entities';
import { Injectable, Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@rent-a-dress/entities';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async getHello(): Promise<string> {
    const users = this.repo;
    const newUser = await users.save({
      username: 'Admin',
      email: 'admin@rent-a-dress.ru',
      role: 'admin',
      password: 'pass',
    });
    console.log(`User id=${newUser.id} was created`);
    return `${await users.count()} users `;
  }
}
