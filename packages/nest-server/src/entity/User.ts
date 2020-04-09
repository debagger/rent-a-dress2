import { IsInt, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Token } from './Token';
import {Exclude} from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsInt()
  @ApiProperty({ description: 'Id for user. Must be positive integer' })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Username' })
  username: string;

  @Column() @IsEmail() @ApiProperty({ description: 'email' }) email: string;

  @Column() @IsString() @ApiProperty({ description: 'role' }) role: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Username' })
  @Exclude()
  password: string;

  @Exclude()
  @OneToMany(
    type => Token,
    token => token.user,
  )
  tokens: Token[];
}
