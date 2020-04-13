import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { User } from '../entity';
import { createHash } from 'crypto';
import { Repository, DeepPartial } from 'typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(<any>repo);
  }

  async createOne(req: CrudRequest, user: DeepPartial<User>): Promise<User> {
    user.password = user.password && this.hash(user.password);
    return await super.createOne(req, user);
  }

  async updateOne(req: CrudRequest, user: DeepPartial<User>): Promise<User> {
    user.password = user.password && this.hash(user.password);
    return super.updateOne(req, user);
  }

  async save(user: DeepPartial<User>): Promise<User> {
    user.password = user.password && this.hash(user.password);
    return await this.repo.save(user);
  }

  async changePassword(user: any, oldPassword: string, newPassword: string) {
    const oldPasswordHash = this.hash(oldPassword);
    const dbUser = await super.findOne({ username: user.username });
    if (dbUser) {
      if (oldPasswordHash === dbUser.password) {
        dbUser.password = this.hash(newPassword);
        await this.repo.save(dbUser);
        return true;
      } else {
        throw new BadRequestException('Incorrect password');
      }
    }
    throw new BadRequestException('User not found');
  }

  hash(input: string) {
    const hash = createHash('sha512');
    hash.update('SALT_FOR_PASSWORD.' + input, 'utf8');
    return hash.digest('base64');
  }
}
