import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { User } from "../entity";
import { createHash } from "crypto";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  hash(input: string) {
    const hash = createHash('sha512');
    hash.update('SALT_FOR_PASSWORD.' + input, 'utf8');
    return hash.digest('base64');
  }
}