import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Token } from './Token';
import { UserInterface } from './user.interface';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() username: string;

  @Column() email: string;

  @Column() role: string;

  @Column()
  password: string;

  @OneToMany(
    type => Token,
    token => token.user,
  )
  tokens: Token[];
}
