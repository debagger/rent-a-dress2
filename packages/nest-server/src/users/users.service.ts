import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { User } from '../entity';
import { createHash } from 'crypto';
import { Repository, DeepPartial } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(<any>repo);
  }

  async createOne(req: CrudRequest, user: DeepPartial<User>): Promise<User> {
    if (user.password) {
      user.password = this.hash(user.password);
    }
    return super.createOne(req, user);
  }

  async updateOne(req: CrudRequest, user: DeepPartial<User>): Promise<User> {
    if (user.password) {
      user.password = this.hash(user.password);
    }
    return super.updateOne(req, user);
  }

  async save(user: DeepPartial<User>): Promise<User> {
    if (user.password) {
      user.password = this.hash(user.password);
    }
    return this.repo.save(user);
  }

  hash(input: string) {
    const hash = createHash('sha512');
    hash.update('SALT_FOR_PASSWORD.' + input, 'utf8');
    return hash.digest('base64');
  }
}